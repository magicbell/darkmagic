import { TrashIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';
import React from 'react';

import * as fake from '~/fixtures';

import { Box } from './box';
import { Tabs } from './tabs';
import { Typography } from './typography';

const meta: Meta = {
  component: Tabs,
  args: {},
  argTypes: {
    size: { control: 'select', options: ['md', 'lg'] },
    variant: { control: 'select', options: ['underline', 'contained'] },
  },
};

export default meta;

export const Basic = (args: any) => (
  <Box css={{}}>
    <Tabs defaultValue="tab1">
      <Tabs.List variant={args.variant} size={args.size} aria-label="Manage your account">
        <Tabs.Tab value="tab1">Smart Delivery</Tabs.Tab>
        <Tabs.Tab value="tab2" addon={3}>
          Templates
        </Tabs.Tab>
        <Tabs.Tab value="tab3" addon={TrashIcon}>
          Inbox
        </Tabs.Tab>
      </Tabs.List>

      <Box p={4}>
        <Tabs.Panel value="tab1">
          <Typography>{fake.listData[0].event}</Typography>
        </Tabs.Panel>
        <Tabs.Panel value="tab2">
          <Typography>{fake.listData[1].event}</Typography>
        </Tabs.Panel>
      </Box>
    </Tabs>
  </Box>
);

Basic.args = {
  variant: 'underline',
};

export const Contained = Basic.bind({});
Contained.args = {
  variant: 'contained',
};
