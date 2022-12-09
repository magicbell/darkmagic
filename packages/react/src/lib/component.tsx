import { isEmptyObject, isPrimitive } from 'is-what';
import { Children, cloneElement, FunctionComponent, isValidElement, ReactElement, ReactNode } from 'react';
import { isElement, isFragment, isValidElementType } from 'react-is';

export function makeComponent(
  Slot: FunctionComponent | ReactElement | string | number | boolean | undefined | null,
): FunctionComponent | null {
  if (Slot == null || Slot === false) return null;

  if (isPrimitive(Slot)) {
    return function Component(props: Record<string, unknown> = {}) {
      return isEmptyObject(props) ? <>{Slot}</> : <div {...props}>{Slot}</div>;
    };
  }

  if (isValidElementType(Slot)) return Slot;
  if (isElement(Slot)) {
    return function Component(props: Record<string, unknown> = {}) {
      return isEmptyObject(props) ? Slot : cloneElement(Slot, { ...Slot.props, props });
    };
  }

  return null;
}

export function mapChildren(children: ReactNode | ReactNode[], cb: (child: ReactElement, index: number) => ReactNode) {
  return Children.map(flattenChildren(children), (child, index) => (isElement(child) ? cb(child, index) : child));
}

function transformChildrenRecursive(
  children: ReactNode | ReactNode[],
  cb: (child: ReactElement, index: number) => ReactNode,
  options = { depth: 0 },
  currentDepth = 0,
): ReactNode {
  const input = flattenChildren(children);
  const output = Children.map(input, (child, index) => {
    if (currentDepth > options.depth) return child;
    if (!isElement(child)) return child;

    if (child.props.children) {
      return cb(
        cloneElement(child, {
          ...child.props,
          children: transformChildrenRecursive(child.props.children, cb, options, currentDepth + 1),
        }),
        index,
      );
    }

    return cb(child, index);
  });

  // As some components require a single child to be provided, we return a single
  // node if the input was a single node, even if that node was wrapped in a fragment.
  return Array.isArray(output) && input.length === 1 ? output[0] : output;
}

export function transformChildren(
  children: ReactNode | ReactNode[],
  cb: (child: ReactElement, index: number) => ReactNode,
  options = { depth: 0 },
) {
  return transformChildrenRecursive(children, cb, options);
}

export function passPropsToChildren(
  children: ReactNode | ReactNode[],
  props: Record<string, unknown> = {},
): ReactNode | ReactNode[] {
  return mapChildren(children, (child) => cloneElement(child, { ...child.props, ...props }));
}

function flattenChildrenRecursive(children: ReactNode, depth = 0, keys: (string | number)[] = []): ReactNode[] {
  return Children.toArray(children).reduce((acc: ReactNode[], node, index) => {
    if (isFragment(node)) {
      acc.push(...flattenChildrenRecursive(node.props.children, depth + 1, [...keys, node.key || index]));
    } else if (isValidElement(node)) {
      acc.push(
        cloneElement(node, {
          key: [...keys, node.key].join('.'),
        }),
      );
    } else if (typeof node === 'string' || typeof node === 'number') {
      acc.push(node);
    }
    return acc;
  }, []);
}

export function flattenChildren(children: ReactNode): ReactNode[] {
  return flattenChildrenRecursive(children);
}
