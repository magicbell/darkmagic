import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ComponentMeta } from '@storybook/react';

import * as fake from '~/fixtures';
import { Icon } from './draft/icon';
import { IconButton } from './icon-button';
import { Listable } from './listable';
import { Text } from './text';

const meta: ComponentMeta<typeof Listable> = {
  component: Listable,
  args: {
    variant: 'default',
    spacing: 'sm',
    children: fake.listData.map((row) => (
      <Listable.Item key={row.id}>
        <Listable.Cell width="min">
          <Icon color={((fake.names.indexOf(row.author) % 3) + 1) as any}>
            {row.author[0]}
            {row.author.slice(-1)}
          </Icon>
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
