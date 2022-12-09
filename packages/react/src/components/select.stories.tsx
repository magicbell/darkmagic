import { Meta } from '@storybook/react';

import { Select } from './select';

const options = Array.from({ length: 20 }).map((_, idx) => `option ${idx + 1}`);

const meta: Meta = {
  component: Select,
  args: {
    placeholder: 'select',
    disabled: false,
    size: 'md',
    state: 'initial',
    children: options.map((option) => (
      <Select.Item key={option} value={option} disabled={option.includes('13')}>
        {option}
      </Select.Item>
    )),
  },
  argTypes: {
    value: { options: options, control: 'select' },
    state: { control: 'select' },
    size: { control: 'select' },
    onOpenChange: { action: 'onOpenChange', table: { category: 'events' } },
    onValueChange: { action: 'onValueChange', table: { category: 'events' } },
    onFocus: { action: 'onFocus', table: { category: 'events' } },
    onBlur: { action: 'onBlur', table: { category: 'events' } },
  },
};

export default meta;

export const Basic = {};

export const Placeholder = {
  args: {
    placeholder: 'select a number',
  },
};

export const Selected = {
  args: {
    value: options[2],
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
