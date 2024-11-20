import { PlusIcon } from '@radix-ui/react-icons';
import { action } from '@storybook/addon-actions';
import { ComponentStoryFn, Meta } from '@storybook/react';

import * as fake from '~/fixtures';

import { Box } from './box';
import { Button } from './button';
import { Code } from './code';
import { Drawer } from './drawer';
import { Flex } from './flex';
import { IconButton } from './icon-button';
import { Tabs } from './tabs';

const meta: Meta = {
  component: Drawer,
  args: {},
  argTypes: {
    width: { control: 'select' },
    variant: { control: 'select', options: ['inline', 'overlay'] },
    align: { control: 'select', options: ['left', 'right'] },
    open: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <Flex justify="end" height="full" css={{ width: '100%' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;

export const Basic: ComponentStoryFn<any> = (args) => (
  <Drawer variant={args.variant} width={args.width}>
    <Drawer.Title>{args.title}</Drawer.Title>
    <Drawer.Description>{args.description}</Drawer.Description>
    <Drawer.Body>Drawer content</Drawer.Body>
  </Drawer>
);

Basic.args = {
  title: 'Drawer Title',
  description: 'Drawer Description',
  content: 'Drawer Content',
};

export const Overlay: ComponentStoryFn<any> = (args) => (
  <Drawer variant={args.variant}>
    <Drawer.Title>{args.title}</Drawer.Title>
    <Drawer.Description>{args.description}</Drawer.Description>
    <Drawer.Body scroll="vertical">
      <Box css={{ height: '200vh' }}>Drawer content - scrollable</Box>
    </Drawer.Body>
  </Drawer>
);

Overlay.args = {
  ...Basic.args,
  variant: 'overlay',
};

export const LeftAligned: ComponentStoryFn<any> = (args) => (
  <Drawer variant={args.variant} align={args.align}>
    <Drawer.Title>{args.title}</Drawer.Title>
    <Drawer.Description>{args.description}</Drawer.Description>
    <Drawer.Body scroll="vertical">
      <Box css={{ height: '200vh' }}>Drawer content - scrollable</Box>
    </Drawer.Body>
  </Drawer>
);

LeftAligned.args = {
  ...Basic.args,
  variant: 'overlay',
  align: 'left',
};

export const ControlledOpen: ComponentStoryFn<any> = (args) => (
  <Drawer variant={args.variant} align={args.align} open={args.open}>
    <Drawer.Title>{args.title}</Drawer.Title>
    <Drawer.Description>{args.description}</Drawer.Description>
    <Drawer.Body scroll="vertical">
      <Box css={{ height: '200vh' }}>Drawer content - scrollable</Box>
    </Drawer.Body>
  </Drawer>
);

ControlledOpen.args = {
  ...Basic.args,
  variant: 'overlay',
  open: true,
};

export const WithActions: ComponentStoryFn<any> = (args) => (
  <Tabs defaultValue="2">
    <Drawer variant={args.variant} onRequestClose={action('onRequestClose')}>
      <Drawer.Title>{args.title}</Drawer.Title>
      <Drawer.Description>{args.description}</Drawer.Description>

      <Drawer.Actions>
        <Button size="md" variant="secondary">
          Button
        </Button>
        <IconButton icon={PlusIcon} label="Add something" size="md" variant="secondary" />
      </Drawer.Actions>

      <Drawer.Tabs>
        <Tabs.List variant="contained">
          <Tabs.Tab value="1">Summary</Tabs.Tab>
          <Tabs.Tab value="2">Long Text</Tabs.Tab>
        </Tabs.List>
      </Drawer.Tabs>

      <Drawer.Body>
        <Tabs.Panel value="1">Tab 1 {args.content}</Tabs.Panel>
        <Tabs.Panel value="2">
          {fake
            .lorem(5)
            .split('\n')
            .map((x, idx) => (
              <p key={idx}>
                {x}
                <br />
                <br />
              </p>
            ))}
        </Tabs.Panel>
      </Drawer.Body>
    </Drawer>
  </Tabs>
);

WithActions.args = {
  title: 'Drawer Title',
  description: 'some description',
  content: 'Content',
  variant: 'inline',
};

export const WithTabs: ComponentStoryFn<any> = (args) => (
  <Tabs defaultValue="2">
    <Drawer variant={args.variant}>
      <Drawer.Title>{args.title}</Drawer.Title>
      <Drawer.Description>{args.description}</Drawer.Description>

      <Drawer.Tabs>
        <Tabs.List variant="contained">
          <Tabs.Tab value="1">Summary</Tabs.Tab>
          <Tabs.Tab value="2">Long Text</Tabs.Tab>
        </Tabs.List>
      </Drawer.Tabs>

      <Drawer.Body>
        <Tabs.Panel value="1">Tab 1 {args.content}</Tabs.Panel>
        <Tabs.Panel value="2">
          {fake
            .lorem(5)
            .split('\n')
            .map((x, idx) => (
              <p key={idx}>
                {x}
                <br />
                <br />
              </p>
            ))}
        </Tabs.Panel>
      </Drawer.Body>
    </Drawer>
  </Tabs>
);

WithTabs.args = {
  title: 'Drawer Title',
  description: '',
  content: 'Content',
  variant: 'inline',
};

export const WithCode: ComponentStoryFn<any> = (args) => (
  <Drawer variant={args.variant}>
    <Drawer.Title>{args.title}</Drawer.Title>
    <Drawer.Description>{args.description}</Drawer.Description>

    <Drawer.Body>
      <Code lang="json" showCopyButton={false} lineClamp={15} scroll="horizontal">
        {JSON.stringify([fake.notification, fake.notification, fake.notification], null, 2)}
      </Code>
    </Drawer.Body>
  </Drawer>
);

WithCode.args = {
  title: 'JSON',
  description: (
    <>
      You can also <Button variant="link">fetch notifications</Button> using the <Button variant="link">API</Button>.
    </>
  ),
  variant: 'inline',
};
