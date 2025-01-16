import { Meta } from '@storybook/react';
import * as React from 'react';

import { RadioGroup } from './radio-group.js';

const options = Array.from({ length: 3 }).map((_, idx) => `option ${idx + 1}`);

const meta: Meta = {
  component: RadioGroup,
  args: {
    spacing: 'md',
    orientation: 'vertical',
    children: options.map((option) => (
      <RadioGroup.Item key={option} value={option} disabled={option.includes('3')}>
        {option}
      </RadioGroup.Item>
    )),
  },
  argTypes: {
    spacing: { control: 'select' },
    value: { options, control: 'select' },
    onValueChange: { action: 'onValueChange', table: { category: 'events' } },
    onFocus: { action: 'onFocus', table: { category: 'events' } },
    onBlur: { action: 'onBlur', table: { category: 'events' } },
  },
};

export default meta;

export const Basic = {};

export const Selected = {
  args: {
    value: options[1],
  },
};

export const Disabled = {
  args: {
    children: options.map((option) => (
      <RadioGroup.Item key={option} value={option} disabled>
        {option}
      </RadioGroup.Item>
    )),
  },
};

export const Invalid = {
  args: {
    children: options.map((option) => (
      <RadioGroup.Item key={option} value={option} state="invalid">
        {option}
      </RadioGroup.Item>
    )),
  },
};

export const Horizontal = {
  args: {
    orientation: 'horizontal',
  },
};
