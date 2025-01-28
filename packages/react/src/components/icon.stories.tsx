import * as icons from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';

import { Icon } from './icon.js';

const iconNames = Object.keys(icons) as (keyof typeof icons)[];

const meta: Meta = {
  component: Icon,
  args: {
    icon: 'MagnifyingGlassIcon',
    iconSize: 'sm',
    containerSize: 'xs',
    color: 'default',
  },
  argTypes: {
    children: { control: 'text', name: 'fallback' },
    icon: { control: 'select', options: iconNames, mapping: icons },
    iconSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    containerSize: { control: 'select', options: ['hug', 'xs', 'sm'] },
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
