import { QuestionMarkIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';
import React from 'react';

import { Flex } from './flex.js';
import { IconButton } from './icon-button.js';
import { Tooltip } from './tooltip.js';

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
