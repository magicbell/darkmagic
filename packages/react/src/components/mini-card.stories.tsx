import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import * as fake from '~/fixtures';

import { Icon } from './draft/icon';
import { IconButton } from './icon-button';
import { MiniCard } from './mini-card';
import { Text } from './text';
import { Typography } from './typography';

const meta: Meta = {
  component: MiniCard,
  args: {
    icon: (
      <Icon color={1} variant="square">
        MB
      </Icon>
    ),
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
      <Icon color={1} variant="square">
        MB
      </Icon>
    ),
    children: <Text primary="MB production" secondary="MagicBell" highlight reverse />,
    addon: <IconButton icon={ChevronDownIcon} variant="ghost" label="menu" />,
  },
};

export const Clickable = {
  args: {
    onClick: action('onClick'),
    icon: (
      <Icon color={1} variant="square">
        MB
      </Icon>
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
    icon: <Icon color={2}>PD</Icon>,
    children: <Text primary="Person Doe" secondary="person@example.com" />,
    addon: <IconButton icon={DotsHorizontalIcon} variant="ghost" label="menu" />,
  },
};

export const TruncatedText = {
  args: {
    icon: <Icon color={2}>PD</Icon>,
    children: <Text primary="Person Doe" secondary={fake.listData[0].event.repeat(3)} />,
    addon: <IconButton icon={DotsHorizontalIcon} variant="ghost" label="menu" />,
  },
};
