import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import * as React from 'react';

import * as fake from '../../fixtures/index.js';
import { Avatar } from './avatar.js';
import { IconButton } from './icon-button.js';
import { MiniCard } from './mini-card.js';
import { Text } from './text.js';
import { Typography } from './typography.js';

const meta: Meta = {
  component: MiniCard,
  args: {
    icon: <Avatar color="accent-1">MB</Avatar>,
    children: <Text primary="MB production" secondary="MagicBell" />,
    addon: <IconButton icon={DotsHorizontalIcon} variant="ghost" label="menu" />,
  },
  argTypes: {},
};

export default meta;

export const Basic = {
  args: {
    onClick: null,
    icon: (
      <Avatar color="accent-1" variant="square">
        MB
      </Avatar>
    ),
    children: <Text primary="MB production" secondary="MagicBell" highlight reverse />,
    addon: <IconButton icon={ChevronDownIcon} variant="ghost" label="menu" />,
  },
};

export const Clickable = {
  args: {
    onClick: action('onClick'),
    icon: (
      <Avatar color="accent-1" variant="square">
        MB
      </Avatar>
    ),
    children: <Text primary="MB production" secondary="MagicBell" />,
    addon: (
      <Typography color="muted">
        <ChevronDownIcon />
      </Typography>
    ),
  },
};

export const Profile = {
  args: {
    icon: (
      <Avatar color="accent-2" variant="circle" src="https://i.pravatar.cc/150?u=person.doe@example.com">
        Person Doe
      </Avatar>
    ),
    children: <Text primary="Person Doe" secondary="person@example.com" />,
    addon: <IconButton icon={DotsHorizontalIcon} variant="ghost" label="menu" />,
  },
};

export const TruncatedText = {
  args: {
    icon: (
      <Avatar color="accent-2" variant="circle" src="https://i.pravatar.cc/150?u=person.doe@example.com">
        Person Doe
      </Avatar>
    ),
    children: <Text primary="Person Doe" secondary={fake.listData[0]!.event.repeat(3)} />,
    addon: <IconButton icon={DotsHorizontalIcon} variant="ghost" label="menu" />,
  },
};
