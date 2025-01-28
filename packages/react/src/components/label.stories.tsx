import { Meta } from '@storybook/react';

import { Label } from './label.js';

const meta: Meta = {
  component: Label,
  args: {
    children: 'This is a form label.',
  },
  argTypes: {
    children: { name: 'text', control: 'text' },
  },
};

export default meta;

export const Basic = {};
