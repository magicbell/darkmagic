import { Meta } from '@storybook/react';

import { Typography } from './typography.js';

const meta: Meta = {
  component: Typography,
  args: {
    children: 'This is a dummy text.',
    color: 'default',
    variant: 'default',
  },
  argTypes: {
    children: { name: 'text', control: 'text' },
    variant: { control: 'select' },
    color: { control: 'select' },
  },
};

export default meta;

export const Basic = {};
