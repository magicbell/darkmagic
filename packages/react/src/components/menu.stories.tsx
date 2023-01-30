import { CodeIcon, GearIcon, Pencil2Icon, PersonIcon, PlusIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';

import { ChartIcon } from '../icons/chart-icon';
import { LogIcon } from '../icons/log-icon';
import { IconButton } from './icon-button';
import { Menu } from './menu';

const options = {
  compose: Pencil2Icon,
  embed: CodeIcon,
  users: PersonIcon,
  analytics: ChartIcon,
  log: LogIcon,
  settings: GearIcon,
};

const meta: Meta = {
  component: Menu,
  args: {
    spacing: 'xs',
    variant: 'primary',
    children: Object.entries(options).map(([key]) => (
      <Menu.Item variant="primary" key={key} active={key === 'log'}>
        {key}
      </Menu.Item>
    )),
  },
  argTypes: {
    variant: { control: 'select' },
    spacing: { control: 'select' },
    collapsed: { control: 'boolean' },
  },
};

export default meta;

export const Basic = {};
export const WithIcon = {
  args: {
    children: Object.entries(options).map(([key, icon]) => (
      <Menu.Item variant="primary" icon={icon} key={key} active={key === 'log'}>
        {key}
      </Menu.Item>
    )),
  },
};

export const IconOnly = {
  args: {
    collapsed: true,
    children: Object.entries(options).map(([key, icon]) => (
      <Menu.Item variant="primary" icon={icon} key={key} active={key === 'log'}>
        {key}
      </Menu.Item>
    )),
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    spacing: 'none',
  },
};

export const SecondaryWithTitle = {
  args: {
    variant: 'secondary',
    spacing: 'none',
    children: (
      <>
        <Menu.Title>Menu</Menu.Title>
        {Object.entries(options).map(([key]) => (
          <Menu.Item key={key} active={key === 'log'}>
            {key}
          </Menu.Item>
        ))}

        <Menu.Title trailingAddon={<IconButton icon={PlusIcon} variant="secondary" size="sm" label="add" />}>
          Menu
        </Menu.Title>
        {Object.entries(options).map(([key]) => (
          <Menu.Item key={key} active={key === 'log'}>
            {key}
          </Menu.Item>
        ))}
      </>
    ),
  },
};
