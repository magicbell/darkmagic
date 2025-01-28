import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';
import * as React from 'react';

import * as fake from '../../fixtures/index.js';
import { Avatar } from './avatar.js';
import { IconButton } from './icon-button.js';
import { Listable } from './listable.js';
import { Text } from './text.js';

const meta: Meta<typeof Listable> = {
  component: Listable,
  args: {
    variant: 'default',
    spacing: 'sm',
    children: fake.listData.map((row) => (
      <Listable.Item key={row.id}>
        <Listable.Cell width="min">
          <Avatar color={`accent-${(fake.names.indexOf(row.author!) % 3) + 1}` as any}>{row.author}</Avatar>
        </Listable.Cell>
        <Listable.Cell width="full">
          <Text primary={row.event} secondary={row.id} />
        </Listable.Cell>
        <Listable.Cell width="min">
          <IconButton size="xs" icon={DotsHorizontalIcon} label="More" variant="ghost" />
        </Listable.Cell>
      </Listable.Item>
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
  args: {
    variant: 'contained',
  },
};

export const Borderless = {
  spacing: 'xxs',
  children: fake.listData.map((row) => (
    <Listable.Item key={row.id}>
      <Listable.Cell width="full">{row.event}</Listable.Cell>
    </Listable.Item>
  )),
};
