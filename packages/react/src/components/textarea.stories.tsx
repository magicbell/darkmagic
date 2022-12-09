import { Meta } from '@storybook/react';

import { TextArea } from './textarea';

const meta: Meta = {
  component: TextArea,
  args: {
    placeholder: 'textarea',
  },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    size: { control: 'select' },
    state: { control: 'select' },
    disabled: { control: 'boolean' },
    onChange: { action: 'onChange', table: { category: 'events' } },
    onFocus: { action: 'onFocus', table: { category: 'events' } },
    onBlur: { action: 'onBlur', table: { category: 'events' } },
  },
};

export default meta;

export const Basic = {};

export const Placeholder = {
  args: {
    placeholder: 'write a message',
  },
};

export const Filled = {
  args: {
    defaultValue: 'A filled textarea with some text',
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
