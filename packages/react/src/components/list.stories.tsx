import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';
import * as React from 'react';

import * as fake from '../../fixtures/index.js';
import { Avatar } from './avatar.js';
import { IconButton } from './icon-button.js';
import { List } from './list.js';
import { Text } from './text.js';

const meta: Meta = {
  component: List,
  args: {
    spacing: 'md',
    children: fake.listData.map((row) => (
      <List.Item key={row.id}>
        <List.Cell width="min">
          <Avatar color={`accent-${(fake.names.indexOf(row.author!) % 3) + 1}` as any}>{row.author}</Avatar>
        </List.Cell>
        <List.Cell width="full">
          <Text primary={row.event} secondary={row.id} />
        </List.Cell>
        <List.Cell width="min">
          <IconButton size="xs" icon={DotsHorizontalIcon} label="More" variant="ghost" />
        </List.Cell>
      </List.Item>
    )),
  },
  argTypes: {
    variant: { control: 'select' },
    spacing: { control: 'select' },
  },
};

export default meta;

export const Basic = {};

export const Contained = {
  args: { variant: 'contained' },
};

export const Borderless = {
  args: {
    spacing: 'xxs',
    children: fake.listData.map((row) => (
      <List.Item key={row.id}>
        <List.Cell width="full">{row.event}</List.Cell>
      </List.Item>
    )),
  },
};
