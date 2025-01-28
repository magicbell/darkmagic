import { Meta } from '@storybook/react';

import { ColorPicker } from './color-picker.js';

const meta: Meta = {
  component: ColorPicker,
  args: {
    placeholder: 'input',
    size: 'md',
    state: 'initial',
    disabled: false,
  },
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { name: 'value', control: 'text' },
    state: { control: 'select' },
    size: { control: 'select' },
    onChange: { action: 'onChange', table: { category: 'events' } },
    onFocus: { action: 'onFocus', table: { category: 'events' } },
    onBlur: { action: 'onBlur', table: { category: 'events' } },
  },
};

export default meta;

export const Basic = {};

export const Placeholder = {
  args: {
    placeholder: 'whats on your mind?',
  },
};

export const Filled = {
  args: {
    defaultValue: '#6E56CF',
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const Invalid = {
  args: {
    state: 'invalid',
  },
};
