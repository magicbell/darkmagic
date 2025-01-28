import {
  ArrowLeftIcon,
  BellIcon,
  ChevronDownIcon,
  CodeIcon,
  DotsHorizontalIcon,
  GearIcon,
  Pencil2Icon,
  PersonIcon,
  PlusIcon,
  ReaderIcon,
} from '@radix-ui/react-icons';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import * as React from 'react';

import { ChartIcon } from '../icons/chart-icon.js';
import { LogIcon } from '../icons/log-icon.js';
import StatusIcon from '../icons/status-icon.js';
import { Avatar } from './avatar.js';
import { Box } from './box.js';
import { Flex } from './flex.js';
import { IconButton } from './icon-button.js';
import { Kbd } from './kbd.js';
import { Menu } from './menu.js';
import { MiniCard } from './mini-card.js';
import { Sidebar } from './sidebar.js';
import { Text } from './text.js';

const options = {
  compose: Pencil2Icon,
  embed: CodeIcon,
  users: PersonIcon,
  analytics: ChartIcon,
  log: LogIcon,
  settings: GearIcon,
};

const options2 = {
  notifications: BellIcon,
  status: StatusIcon,
  docs: ReaderIcon,
};

function getMenuItems(menuProps = {}) {
  return Object.entries(options).map(([key, icon]) => (
    <Menu.Item variant="primary" key={key} active={key === 'log'} icon={icon} {...menuProps}>
      <Flex
        justify="between"
        align="center"
        css={{
          '& > kbd': {
            opacity: 0,
          },
          '&:hover > kbd': {
            opacity: 1,
          },
        }}
      >
        <span>{key}</span> <Kbd shortcut={`g ${key[0]}`} />
      </Flex>
    </Menu.Item>
  ));
}

function getFooterItems(menuProps = {}) {
  return Object.entries(options2).map(([key, icon]) => (
    <Menu.Item variant="primary" key={key} icon={icon} {...menuProps}>
      {key}
    </Menu.Item>
  ));
}

const meta: Meta = {
  component: Sidebar,
  args: {},
  argTypes: {},
};

export default meta;

export const Primary = {
  args: {
    variant: 'primary',
    collapsable: true,
    children: (
      <React.Fragment>
        <MiniCard
          css={{ borderBottom: '1px solid $border-muted' }}
          icon={
            <Avatar color="accent-1" variant="square">
              MB
            </Avatar>
          }
          addon={<IconButton icon={ChevronDownIcon} variant="ghost" label="menu" />}
        >
          <Text primary="MB production" secondary="MagicBell" highlight reverse bold />
        </MiniCard>

        <Menu>{getMenuItems()}</Menu>
        <Box flex="auto" />
        <Menu css={{ paddingBottom: '$6' }}>{getFooterItems()}</Menu>

        <MiniCard
          icon={
            <Avatar color="accent-3" variant="circle">
              Person Doe
            </Avatar>
          }
          addon={<IconButton icon={DotsHorizontalIcon} variant="ghost" label="menu" />}
        >
          <Text primary="Person Doe" secondary="person@example.com" bold />
        </MiniCard>
      </React.Fragment>
    ),
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    collapsable: false,
    children: (
      <Menu variant="secondary">
        <Menu.Title>Menu 1</Menu.Title>
        {getMenuItems({ icon: null })}

        <Menu.Title
          trailingAddon={
            <IconButton variant="secondary" size="sm" icon={PlusIcon} onClick={action('add')} label="add" />
          }
        >
          Menu 2
        </Menu.Title>
        {getMenuItems({ icon: null, active: false })}
      </Menu>
    ),
  },
};

export const Double = () => (
  <Flex height="full">
    <Sidebar>{Primary.args.children}</Sidebar>
    <Sidebar variant="secondary">{Secondary.args.children}</Sidebar>
  </Flex>
);

export const SubNav = {
  args: {
    variant: 'primary',
    collapsable: false,
    children: (
      <React.Fragment>
        <MiniCard
          css={{ borderBottom: '1px solid $border-muted' }}
          icon={
            <Avatar color="accent-1" variant="square">
              MB
            </Avatar>
          }
          addon={<IconButton icon={ChevronDownIcon} variant="ghost" label="menu" />}
        >
          <Text primary="MB production" secondary="MagicBell" highlight reverse bold />
        </MiniCard>

        <Menu variant="secondary">
          <Menu.Title
            color="highlight"
            leadingAddon={<IconButton icon={ArrowLeftIcon} variant="ghost" label="back" size="md" />}
          >
            Users
          </Menu.Title>
          <Menu.Item active>All users</Menu.Item>

          <Menu.Title>Segments</Menu.Title>
          <Menu.Item>Free tier</Menu.Item>
          <Menu.Item>Pro Max </Menu.Item>
          <Menu.Item>Enterprise</Menu.Item>
        </Menu>
        <Box flex="auto" />

        <Menu css={{ paddingBottom: '$6' }}>{getFooterItems()}</Menu>

        <MiniCard
          icon={
            <Avatar color="accent-3" variant="circle">
              Person Doe
            </Avatar>
          }
          addon={<IconButton icon={DotsHorizontalIcon} variant="ghost" label="menu" />}
        >
          <Text primary="Person Doe" secondary="person@example.com" bold />
        </MiniCard>
      </React.Fragment>
    ),
  },
};
