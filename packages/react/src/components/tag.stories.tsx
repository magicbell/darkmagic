import * as icons from '@radix-ui/react-icons';
import { PersonIcon } from '@radix-ui/react-icons';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import { Tag } from './tag';

const iconNames = Object.keys(icons) as (keyof typeof icons)[];
const iconMap = {
  '-': undefined,
  ...iconNames.reduce((acc, key) => Object.assign(acc, { [key]: icons[key] }), {}),
};

const meta: Meta = {
  component: Tag,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'sm',
    type: 'button',
    onClick: null,
    onDismiss: null,
  },
  argTypes: {
    children: { name: 'text', control: 'text' },
    icon: { control: 'select', options: ['-', ...iconNames], mapping: iconMap },
    size: { control: 'select' },
    onClick: { action: 'onClick', table: { category: 'events' } },
    onDismiss: { action: 'onDismiss', table: { category: 'events' } },
  },
};

export default meta;

export const Basic = { args: { children: 'tag' } };
export const Clickable = { args: { children: 'button', onClick: action('onClick') } };
export const Dismissable = { args: { children: 'tag', onDismiss: action('onDismiss') } };
export const WithIcon = { args: { children: 'person', icon: PersonIcon, onClick: action('onClick') } };
export const DismissableWithIcon = {
  args: { children: 'person', icon: PersonIcon, onClick: action('onClick'), onDismiss: action('onDismiss') },
};
