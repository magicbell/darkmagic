import { ChatBubbleIcon, DesktopIcon, DotsHorizontalIcon, EnvelopeClosedIcon, MobileIcon } from '@radix-ui/react-icons';
import { ComponentProps } from '@stitches/react';
import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';

import * as fake from '../../fixtures/index.js';
import { Avatar } from './avatar.js';
import { Badge } from './badge.js';
import { Flex } from './flex.js';
import { IconButton } from './icon-button.js';
import { SortButton } from './sort-button.js';
import { Table } from './table.js';
import { Text } from './text.js';
import { Typography } from './typography.js';

const meta: Meta<typeof Table> = {
  component: Table,
  args: {},
  argTypes: {
    variant: { control: 'select' },
    spacing: { control: 'select' },
  },
};

export default meta;

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export const Basic: StoryFn<typeof Table> = (args: ComponentProps<typeof Table>) => (
  <Table spacing={args.spacing} variant={args.variant}>
    <Table.Head>
      <Table.Row>
        <Table.Cell width="xs">
          <SortButton direction="desc">Created</SortButton>
        </Table.Cell>
        <Table.Cell width="auto">Title | Notification ID</Table.Cell>
        <Table.Cell width="md">
          <SortButton>selection</SortButton>
        </Table.Cell>
        <Table.Cell>Status</Table.Cell>
        <Table.Cell>Channels</Table.Cell>
        <Table.Cell width="min" />
      </Table.Row>
    </Table.Head>

    <Table.Body>
      {fake.listData.map((row) => (
        <Table.Row key={row.id}>
          <Table.Cell width="xs">{dateFormat.format(row.date)}</Table.Cell>
          <Table.Cell width="auto">
            <Text primary={row.event} secondary={row.id} />
          </Table.Cell>
          <Table.Cell width="md">
            <Typography variant="small" color="muted">
              {row.selection}
            </Typography>
          </Table.Cell>
          <Table.Cell>
            <Badge color={`accent-${(fake.status.indexOf(row.status!) % 3) + 1}` as any}>{row.status}</Badge>
          </Table.Cell>
          <Table.Cell muted>
            <Flex gap={2} flex="none">
              <EnvelopeClosedIcon />
              <ChatBubbleIcon />
              <DesktopIcon />
              <MobileIcon />
            </Flex>
          </Table.Cell>
          <Table.Cell width="min">
            <IconButton size="xs" icon={DotsHorizontalIcon} label="More" variant="ghost" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

Basic.args = {
  spacing: 'sm',
};

export const Responsive: StoryFn<typeof Table> = (args: ComponentProps<typeof Table>) => (
  <Table spacing={args.spacing} variant={args.variant}>
    <Table.Head>
      <Table.Row>
        <Table.Cell width="min">
          <SortButton direction="desc">Created</SortButton>
        </Table.Cell>
        <Table.Cell width="auto">Title | Notification ID</Table.Cell>
        <Table.Cell width="auto">
          <SortButton>selection</SortButton>
        </Table.Cell>
        <Table.Cell width="min">Status</Table.Cell>
        <Table.Cell width="min">Channels</Table.Cell>
        <Table.Cell width="min" />
      </Table.Row>
    </Table.Head>

    <Table.Body>
      {fake.listData.map((row) => (
        <Table.Row key={row.id}>
          <Table.Cell width="min">{dateFormat.format(row.date)}</Table.Cell>
          <Table.Cell width="auto">
            <Text primary={row.event} secondary={row.id} />
          </Table.Cell>
          <Table.Cell width="auto">
            <Typography variant="small" color="muted">
              {row.selection}
            </Typography>
          </Table.Cell>
          <Table.Cell width="min">
            <Badge color={`accent-${(fake.status.indexOf(row.status!) % 3) + 1}` as any}>{row.status}</Badge>
          </Table.Cell>
          <Table.Cell width="min" muted>
            <Flex gap={2} flex="none">
              <EnvelopeClosedIcon />
              <ChatBubbleIcon />
              <DesktopIcon />
              <MobileIcon />
            </Flex>
          </Table.Cell>
          <Table.Cell width="min">
            <IconButton size="xs" icon={DotsHorizontalIcon} label="More" variant="ghost" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

Responsive.args = {
  spacing: 'sm',
};

export const Contained: StoryFn<typeof Table> = (args: ComponentProps<typeof Table>) => (
  <Table spacing={args.spacing} variant={args.variant}>
    <Table.Body>
      {fake.listData.map((row) => (
        <Table.Row key={row.id}>
          <Table.Cell width="min">
            <Avatar color={`accent-${(fake.names.indexOf(row.author!) % 5) + 1}` as any}>{row.author}</Avatar>
          </Table.Cell>
          <Table.Cell width="auto">
            <Text primary={row.event} secondary={row.id} />
          </Table.Cell>
          <Table.Cell width="min">
            <IconButton size="xs" icon={DotsHorizontalIcon} label="More" variant="ghost" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

Contained.args = {
  spacing: 'md',
  variant: 'contained',
};
