import { Meta } from '@storybook/react';

import { Checkbox } from './checkbox';

const meta: Meta = {
  component: Checkbox,
  args: {
    children: 'Accept terms and conditions.',
    state: 'initial',
    size: 'md',
    variant: 'checkbox',
  },
  argTypes: {
    children: { name: 'label', control: 'text' },
    checked: { control: 'boolean' },
    required: { control: 'boolean' },
    state: { control: 'select' },
    size: { control: 'select', options: ['xs', 'sm', 'md'] },
    variant: { control: 'select', options: ['checkbox', 'button'] },
    onCheckedChange: { action: 'onCheckedChange', table: { category: 'events' } },
    onClickLabel: { action: 'onClickLabel', table: { category: 'events' } },
    onMouseEnter: { action: 'onMouseEnter', table: { category: 'events' } },
    onMouseLeave: { action: 'onMouseLeave', table: { category: 'events' } },
    noWrap: { control: 'boolean' },
  },
};

export default meta;

export const Basic = {};

export const Checked = {
  args: {
    checked: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const Required = {
  args: {
    required: true,
  },
};

export const Invalid = {
  args: {
    state: 'invalid',
  },
};

export const InvalidChecked = {
  args: {
    state: 'invalid',
    checked: true,
  },
};
