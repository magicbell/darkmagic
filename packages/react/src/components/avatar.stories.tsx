import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';
import * as React from 'react';

import { Avatar } from './avatar.js';
import { Icon } from './icon.js';

const meta: Meta = {
  component: Avatar,
  args: {
    children: 'Person Doe',
    src: 'https://i.pravatar.cc/150?u=fake@example.com',
    icon: '-',
    size: 'md',
    color: 'default',
    variant: 'circle',
  },
  argTypes: {
    children: { control: 'text', name: 'fallback' },
    src: { control: 'text' },
    icon: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['circle', 'square'] },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'muted',
        'error',
        'warning',
        'success',
        'info',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4',
        'accent-5',
      ],
    },
  },
};

export default meta;

export const Basic = {};
export const WithIcon = {
  args: {
    color: 'default',
    src: undefined,
    children: <Icon icon={MagnifyingGlassIcon} iconSize="lg" />,
  },
};
