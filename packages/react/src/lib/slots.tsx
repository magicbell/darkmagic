import { isString } from 'is-what';
import * as React from 'react';

import { flattenChildren } from './component.js';

// Would be nice to use `Symbol.for('slot') here, but TSC kept throwing:
//   Exported variable 'Pane' has or is using name 'SlotSymbol' from external module "/src/lib/slots" but cannot be named.
//   Couldn't find a solution that worked, but this does. See https://github.com/microsoft/TypeScript/issues/5711
const SlotSymbol = '__slot__'; // Symbol.for('slot');
type SlotProps = { [SlotSymbol]: { name: string; container: boolean } };
type SlottedComponent = React.FunctionComponent<any> & SlotProps;

export function createSlot(name: string): SlottedComponent {
  // Don't pull this component out, it needs to be dynamically created
  function SlottedComponent(): React.ReactElement {
    throw new Error(`"${name}" is slot component and should only be used as a direct child of it's parent primitive.`);
  }

  return Object.assign(SlottedComponent, { [SlotSymbol]: { name, container: true } });
}

export function isSlotComponent<T>(component: T): component is T & { type: SlotProps } {
  return React.isValidElement(component) && !isString(component.type) && SlotSymbol in component.type;
}

export function getSlots<T extends Record<string, string | React.ComponentType<any>>>(
  children: React.ReactNode,
  slotMap: T,
) {
  const slots: Partial<Record<keyof T, React.ReactNode>> = {};
  const slotNames = Object.keys(slotMap) as (keyof T)[];
  const rest: React.ReactNode[] = [];

  for (const child of flattenChildren(children)) {
    if (!React.isValidElement(child)) {
      rest.push(child);
      continue;
    }

    const slotName = slotNames.find((name) => child.type === slotMap[name]);
    if (!slotName) {
      rest.push(child);
      continue;
    }

    // We only support single slots, so we don't need to dynamically create arrays.
    // By supporting only a single child, we ensure that the node remains the same
    // across renders.
    if (slots[slotName]) throw new Error(`Slot ${String(slotName)} is already used.`);
    slots[slotName] = isSlotComponent(child) ? (child as React.ReactElement).props.children : child;
  }

  return {
    ...slots,
    children: rest.length === 0 ? null : rest,
  };
}
