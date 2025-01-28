import * as icons from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';

import { Button } from './button.js';

const iconNames = Object.keys(icons) as (keyof typeof icons)[];
const iconMap = {
  '-': undefined,
  ...iconNames.reduce((acc, key) => Object.assign(acc, { [key]: icons[key] }), {}),
};

const meta: Meta = {
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    type: 'button',
  },
  argTypes: {
    children: { name: 'text', control: 'text' },
    disabled: { control: 'boolean' },
    leadingIcon: { control: 'select', options: ['-', ...iconNames], mapping: iconMap },
    trailingIcon: { control: 'select', options: ['-', ...iconNames], mapping: iconMap },
    variant: { control: 'select' },
    size: { control: 'select' },
    width: { control: 'select' },
    type: { control: 'select' },
    onClick: { action: 'onClick', table: { category: 'events' } },
    state: { control: 'select', options: ['idle', 'loading', 'success', 'error'] },
    stateResetDelay: { control: 'number' },
  },
};

export default meta;

export const Primary = { args: { variant: 'primary' } };
export const Secondary = { args: { variant: 'secondary' } };
export const Danger = { args: { variant: 'danger' } };
export const Ghost = { args: { variant: 'ghost' } };
export const Link = { args: { variant: 'link' } };
