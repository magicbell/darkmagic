import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';
import * as React from 'react';

import * as fake from '../../fixtures/index.js';
import { Avatar } from './avatar.js';
import { Grid } from './grid.js';
import { IconButton } from './icon-button.js';
import { Text } from './text.js';

const meta: Meta<typeof Grid> = {
  component: Grid,
  args: {
    spacing: 'xs',
    css: {
      gridTemplateColumns: 'min-content 1fr min-content',
    },
    children: fake.listData.map((row) => (
      <React.Fragment key={row.id}>
        <Grid.Cell>
          <Avatar color={`accent-${(fake.names.indexOf(row.author!) % 3) + 1}` as any}>{row.author}</Avatar>
        </Grid.Cell>
        <Grid.Cell>
          <Text primary={row.event} secondary={row.id} />
        </Grid.Cell>
        <Grid.Cell>
          <IconButton size="xs" icon={DotsHorizontalIcon} label="More" variant="ghost" />
        </Grid.Cell>
      </React.Fragment>
    )),
  },
  argTypes: {
    spacing: { control: 'select' },
  },
};

export default meta;

export const Basic = {};
