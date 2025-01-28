import { Meta } from '@storybook/react';

import { Checkbox } from './checkbox.js';

const meta: Meta = {
  component: Checkbox,
  args: {
    children: 'Accept terms and conditions.',
    state: 'initial',
  },
  argTypes: {
    children: { name: 'label', control: 'text' },
    checked: { control: 'boolean' },
    required: { control: 'boolean' },
    state: { control: 'select' },
    onCheckedChange: { action: 'onCheckedChange', table: { category: 'events' } },
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
