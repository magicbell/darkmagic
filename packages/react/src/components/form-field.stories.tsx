import { Meta } from '@storybook/react';
import * as React from 'react';

import { Checkbox } from './checkbox.js';
import { FormField } from './form-field.js';
import { Input } from './input.js';
import { RadioGroup } from './radio-group.js';
import { Select } from './select.js';
import { TextArea } from './textarea.js';

const mapping = {
  input: <Input />,
  textarea: <TextArea />,
  checkbox: <Checkbox>Agree to terms</Checkbox>,
  radio: (
    <RadioGroup>
      <RadioGroup.Item value="1">One</RadioGroup.Item>
      <RadioGroup.Item value="2">Two</RadioGroup.Item>
    </RadioGroup>
  ),
  select: (
    <Select>
      <Select.Item value="1">One</Select.Item>
      <Select.Item value="2">Two</Select.Item>
    </Select>
  ),
};

const meta: Meta = {
  component: FormField,
  args: {
    children: 'input',
    label: 'This is a form label.',
  },
  argTypes: {
    children: { name: 'control', control: 'select', options: Object.keys(mapping), mapping },
    state: { control: 'select' },
  },
};

export default meta;

export const Basic = {};

export const WithLeadingHint = {
  args: {
    leadingHint: 'This is a leading hint.',
  },
};

export const WithTrailingHint = {
  args: {
    trailingHint: 'This is a trailing hint.',
  },
};

export const WithLeadingError = {
  args: {
    leadingError: 'This is a leading error.',
  },
};

export const WithTrailingError = {
  args: {
    trailingError: 'This is a trailing error.',
  },
};
