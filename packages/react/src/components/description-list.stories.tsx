import { Meta } from '@storybook/react';
import * as React from 'react';

import * as fake from '../../fixtures/index.js';
import { DescriptionList } from './description-list.js';

const meta: Meta<typeof DescriptionList> = {
  component: DescriptionList,
  subcomponents: { 'DescriptionList.Item': DescriptionList.Item },
  args: {
    variant: 'table',
    labelWidth: 'sm',
    children: fake.listData.map((option) => (
      <DescriptionList.Item
        key={option.id}
        label={option.author}
        value={option.event.repeat(3)}
        showCopyButton={false}
      />
    )),
  },
  argTypes: {
    variant: { control: 'select' },
    labelWidth: { control: 'select' },
  },
};

export default meta;

export const Basic = {};

export const Stacked = {
  args: {
    variant: 'stacked',
  },
};
