import { ComponentMeta } from '@storybook/react';

import * as fake from '~/fixtures';
import { DescriptionList } from './description-list';

const meta: ComponentMeta<typeof DescriptionList> = {
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
