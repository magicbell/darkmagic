import * as icons from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';

import { IconButton } from './icon-button.js';

const iconNames = Object.keys(icons) as (keyof typeof icons)[];
const iconMap: Record<string, Element | undefined> = {
  '-': undefined,
  ...iconNames.reduce((acc, key) => Object.assign(acc, { [key]: icons[key] }), {}),
};

const meta: Meta = {
  component: IconButton,
  args: {
    label: 'Add something',
    variant: 'primary',
    size: 'md',
    icon: 'PlusIcon',
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'select', options: ['-', ...iconNames], mapping: iconMap },
    variant: { control: 'select' },
    size: { control: 'select' },
    type: { control: 'select' },
    onClick: { action: 'onClick', table: { category: 'events' } },
  },
};

export default meta;

export const Primary = { args: { variant: 'primary' } };
export const Secondary = { args: { variant: 'secondary' } };
export const Danger = { args: { icon: 'TrashIcon', variant: 'danger' } };
export const Ghost = { args: { variant: 'ghost' } };
export const Inline = { args: { icon: 'QuestionMarkCircledIcon', variant: 'inline' } };
