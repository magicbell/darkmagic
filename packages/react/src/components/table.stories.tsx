import { ChatBubbleIcon, DesktopIcon, DotsHorizontalIcon, EnvelopeClosedIcon, MobileIcon } from '@radix-ui/react-icons';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import * as fake from '~/fixtures';
import { Badge } from './badge';
import { Icon } from './draft/icon';
import { Flex } from './flex';
import { IconButton } from './icon-button';
import { SortButton } from './sort-button';
import { Table } from './table';
import { Text } from './text';
import { Typography } from './typography';

const meta: ComponentMeta<typeof Table> = {
  component: Table,
  args: {},
  argTypes: {
    variant: { control: 'select' },
    spacing: { control: 'select' },
  },
};

export default meta;

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export const Basic: ComponentStory<typeof Table> = (args) => (
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
            <Badge color={`accent-${(fake.status.indexOf(row.status) % 3) + 1}` as any}>{row.status}</Badge>
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

export const Responsive: ComponentStory<typeof Table> = (args) => (
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
            <Badge color={`accent-${(fake.status.indexOf(row.status) % 3) + 1}` as any}>{row.status}</Badge>
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

export const Contained: ComponentStory<typeof Table> = (args) => (
  <Table spacing={args.spacing} variant={args.variant}>
    <Table.Body>
      {fake.listData.map((row) => (
        <Table.Row key={row.id}>
          <Table.Cell width="min">
            <Icon color={((fake.names.indexOf(row.author) % 3) + 1) as any}>
              {row.author[0]}
              {row.author.slice(-1)}
            </Icon>
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
