import { action } from '@storybook/addon-actions';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { useState } from 'react';

import { Button } from './button';
import { Dialog } from './dialog';
import { Flex } from './flex';
import { Typography } from './typography';

const meta: Meta = {
  component: Dialog,
  args: {
    defaultOpen: true,
    children: (
      <>
        <Dialog.Trigger>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Title Here</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>

          <Dialog.Body>
            <div>and everything else</div>
          </Dialog.Body>
        </Dialog.Content>
      </>
    ),
  },
  argTypes: {
    width: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

export const Basic = {};

export const Example: ComponentStoryFn<any> = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen} dismissable={false}>
      <Dialog.Trigger>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>

      <Dialog.Content width={args.width}>
        <Dialog.Title>
          <Typography variant="h2" align="center">
            Are you sure you want to delete this User?
          </Typography>
        </Dialog.Title>
        <Dialog.Body>
          <Typography variant="small" align="center">
            The User’s data will be lost. This action cannot be undone.
          </Typography>

          <Flex gap={2} pt={6} justify="center">
            <Button
              variant="secondary"
              onClick={() => {
                action('onCancel')();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                action('onDelete')();
                setOpen(false);
              }}
            >
              Delete User
            </Button>
          </Flex>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  );
};

Example.args = {
  width: 'sm',
};
