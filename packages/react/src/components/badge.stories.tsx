import * as icons from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';

import { Badge } from './badge';

const iconNames = Object.keys(icons) as (keyof typeof icons)[];
const iconMap: Record<string, Element | undefined> = {
  '-': undefined,
  ...iconNames.reduce((acc, key) => Object.assign(acc, { [key]: icons[key] }), {}),
};

const meta: Meta = {
  component: Badge,
  args: {
    children: 'badge',
    color: 'muted',
    icon: '-',
  },
  argTypes: {
    children: { name: 'label', control: 'text' },
    color: { control: 'select' },
    icon: { control: 'select', options: ['-', ...iconNames], mapping: iconMap },
  },
};

export default meta;

export const Basic = {};
export const Alert = { args: { color: 'error', icon: 'ExclamationTriangleIcon' } };
export const Dot = { args: { color: 'success', children: 'read' } };
