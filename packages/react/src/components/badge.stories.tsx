import * as icons from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';

import { Badge } from './badge.js';

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
    variant: 'dot',
  },
  argTypes: {
    children: { name: 'label', control: 'text' },
    color: { control: 'select' },
    icon: { control: 'select', options: ['-', ...iconNames], mapping: iconMap },
    variant: { control: 'select', options: ['dot', 'filled', 'outline'] },
  },
};

export default meta;

export const Basic = {};
export const Alert = { args: { color: 'error', icon: 'ExclamationTriangleIcon' } };
export const Dot = { args: { color: 'success', children: 'read' } };
