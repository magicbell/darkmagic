import { isEmptyObject, isPrimitive } from 'is-what';
import * as React from 'react';
import { isElement, isFragment, isValidElementType } from 'react-is';

export function makeComponent(
  Slot: React.FunctionComponent | React.ReactElement | string | number | boolean | undefined | null,
): React.FunctionComponent | null {
  if (Slot == null || Slot === false) return null;

  if (isPrimitive(Slot)) {
    return function Component(props: Record<string, unknown> = {}): React.ReactElement {
      if (isEmptyObject(props)) return React.createElement(React.Fragment, null, Slot);
      return React.createElement('div', props, Slot);
    };
  }

  if (isValidElementType(Slot)) return Slot as any;

  if (isElement(Slot)) {
    return function Component(props: Record<string, unknown> = {}) {
      return isEmptyObject(props)
        ? (Slot as unknown as any)
        : React.cloneElement(Slot as any, { ...Slot.props, props });
    };
  }

  return null;
}

export function mapChildren(
  children: React.ReactNode | React.ReactNode[],
  cb: (child: React.ReactElement, index: number) => React.ReactNode,
) {
  return React.Children.map(flattenChildren(children), (child, index) =>
    isElement(child) ? cb(child as React.ReactElement, index) : child,
  );
}

function transformChildrenRecursive(
  children: React.ReactNode | React.ReactNode[],
  cb: (child: React.ReactElement, index: number) => React.ReactNode,
  options = { depth: 0 },
  currentDepth = 0,
): React.ReactNode {
  const input = flattenChildren(children);
  const output = React.Children.map(input, (child, index) => {
    if (currentDepth > options.depth) return child;
    if (!isElement(child)) return child;

    if (child.props.children) {
      return cb(
        React.cloneElement(child as React.ReactElement, {
          ...child.props,
          children: transformChildrenRecursive(child.props.children, cb, options, currentDepth + 1),
        }),
        index,
      );
    }

    return cb(child as React.ReactElement, index);
  });

  // As some components require a single child to be provided, we return a single
  // node if the input was a single node, even if that node was wrapped in a fragment.
  return Array.isArray(output) && input.length === 1 ? output[0] : output;
}

export function transformChildren(
  children: React.ReactNode | React.ReactNode[],
  cb: (child: React.ReactElement, index: number) => React.ReactNode,
  options = { depth: 0 },
) {
  return transformChildrenRecursive(children, cb, options);
}

export function passPropsToChildren(
  children: React.ReactNode | React.ReactNode[],
  props: Record<string, unknown> = {},
): React.ReactNode | React.ReactNode[] {
  return mapChildren(children, (child) => React.cloneElement(child, { ...child.props, ...props }));
}

function flattenChildrenRecursive(
  children: React.ReactNode,
  depth = 0,
  keys: (string | number)[] = [],
): React.ReactNode[] {
  return React.Children.toArray(children).reduce((acc: React.ReactNode[], node, index) => {
    if (isFragment(node)) {
      acc.push(...flattenChildrenRecursive(node.props.children, depth + 1, [...keys, node.key || index]));
    } else if (React.isValidElement(node)) {
      acc.push(
        React.cloneElement(node, {
          key: [...keys, node.key].join('.'),
        }),
      );
    } else if (typeof node === 'string' || typeof node === 'number') {
      acc.push(node);
    }
    return acc;
  }, []);
}

export function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  return flattenChildrenRecursive(children);
}
