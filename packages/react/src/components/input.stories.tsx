import * as icons from '@radix-ui/react-icons';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import * as React from 'react';

import { IconButton } from './icon-button.js';
import { Input } from './input.js';
import { Typography } from './typography.js';

const addons = {
  '-': undefined,
  usd: () => <Typography color="muted">USD</Typography>,
  px: () => <Typography color="muted">px</Typography>,
  'close-icon': icons.Cross2Icon,
  'search-icon': icons.MagnifyingGlassIcon,
  'copy-button': () => (
    <IconButton onClick={action('onClickAddon')} variant="ghost" size="xs" icon={icons.CopyIcon} label="copy" />
  ),
};

const meta: Meta = {
  component: Input,
  args: {
    placeholder: 'input',
    size: 'md',
    state: 'initial',
    disabled: false,
  },
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { name: 'value', control: 'text' },
    state: { control: 'select' },
    size: { control: 'select' },
    leadingAddon: { control: 'select', options: Object.keys(addons), mapping: addons },
    trailingAddon: { control: 'select', options: Object.keys(addons), mapping: addons },
    onChange: { action: 'onChange', table: { category: 'events' } },
    onFocus: { action: 'onFocus', table: { category: 'events' } },
    onBlur: { action: 'onBlur', table: { category: 'events' } },
  },
};

export default meta;

export const Basic = {};

export const Placeholder = {
  args: {
    placeholder: 'whats on your mind?',
  },
};

export const Filled = {
  args: {
    defaultValue: 'A filled input with some text',
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

export const LeadingTextAddon = {
  args: {
    leadingAddon: addons.usd,
  },
};

export const LeadingButtonAddon = {
  args: {
    leadingAddon: addons['copy-button'],
  },
};

export const LeadingIconAddon = {
  args: {
    leadingAddon: addons['search-icon'],
  },
};

export const TrailingTextAddon = {
  args: {
    trailingAddon: addons.px,
  },
};

export const TrailingButtonAddon = {
  args: {
    trailingAddon: addons['copy-button'],
  },
};

export const TrailingIconAddon = {
  args: {
    trailingAddon: addons['close-icon'],
  },
};
