import { QuestionMarkIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';
import React from 'react';

import { Flex } from './flex';
import { IconButton } from './icon-button';
import { ToggleGroup } from './toggle-group';
import { Tooltip } from './tooltip';

const meta: Meta = {
  component: Tooltip,
  args: {
    defaultOpen: true,
    children: <IconButton icon={QuestionMarkIcon} label="help" variant="secondary" />,
    content: 'Tooltip content',
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <Flex align="center" justify="center" height="full">
        <Tooltip.Provider>
          <Story />
        </Tooltip.Provider>
      </Flex>
    ),
  ],
};

export default meta;

export const Basic = {};

export const Left = { args: { side: 'left' } };

export const Right = { args: { side: 'right' } };

export const Top = { args: { side: 'top' } };

export const Bottom = { args: { side: 'bottom' } };

export const OnToggle = (args) => (
  <ToggleGroup size="md" type="single">
    <Tooltip {...args}>
      {/* Wrapping the children in Flex prevents clash on radix-uis internal `data-state` prop */}
      <Flex>
        <ToggleGroup.Item width="hug" value="all">
          Toggle
        </ToggleGroup.Item>
      </Flex>
    </Tooltip>
  </ToggleGroup>
);
