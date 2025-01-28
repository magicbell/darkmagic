import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Flex } from './flex.js';
import { FormField } from './form-field.js';
import { IconButton } from './icon-button.js';
import { Input } from './input.js';
import { Popover } from './popover.js';

const Component: StoryFn<any> = (args) => (
  <Popover open={args.open}>
    <Popover.Trigger>
      <IconButton label="Update sender" icon={MixerHorizontalIcon} />
    </Popover.Trigger>
    <Popover.Content sideOffset={8} side={args.side} padding={args.padding}>
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
    padding: 'none',
  },
  argTypes: {
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl'] },
  },
  decorators: [
    (Story) => (
      <Flex align="center" justify="center" height="full">
        <Story />
      </Flex>
    ),
  ],
};

export default meta;

export const Basic: StoryFn<any> = Component;
Basic.args = { open: true };

export const Left = Basic.bind({});
Left.args = { side: 'left' };

export const Right = Basic.bind({});
Right.args = { side: 'right' };

export const Top = Basic.bind({});
Top.args = { side: 'top' };

export const Bottom = Basic.bind({});
Bottom.args = { side: 'bottom' };
