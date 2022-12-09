import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { ComponentStoryFn, Meta } from '@storybook/react';
import React from 'react';

import { Flex } from './flex';
import { FormField } from './form-field';
import { IconButton } from './icon-button';
import { Input } from './input';
import { Popover } from './popover';

const Component: ComponentStoryFn<any> = (args) => (
  <Popover open={args.open}>
    <Popover.Trigger>
      <IconButton label="Update sender" icon={MixerHorizontalIcon} />
    </Popover.Trigger>
    <Popover.Content sideOffset={8} side={args.side}>
      <Popover.Title>Update Sender</Popover.Title>
      <Popover.Body>
        <Flex css={{ flexDirection: 'column', gap: 10 }}>
          <FormField label="sender name">
            <Input defaultValue="Person Doe" />
          </FormField>
          <FormField label="sender email">
            <Input defaultValue="noreply@example.com" />
          </FormField>
        </Flex>
      </Popover.Body>
    </Popover.Content>
  </Popover>
);

const meta: Meta = {
  component: Popover,
  args: {
    open: true,
    content: 'Popover content',
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <Flex align="center" justify="center" height="full">
        <Story />
      </Flex>
    ),
  ],
};

export default meta;

export const Basic: ComponentStoryFn<any> = Component;
Basic.args = { open: true };

export const Left = Basic.bind({});
Left.args = { side: 'left' };

export const Right = Basic.bind({});
Right.args = { side: 'right' };

export const Top = Basic.bind({});
Top.args = { side: 'top' };

export const Bottom = Basic.bind({});
Bottom.args = { side: 'bottom' };
