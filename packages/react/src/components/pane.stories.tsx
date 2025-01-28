import { PlusIcon } from '@radix-ui/react-icons';
import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';

import * as fake from '../../fixtures/index.js';
import { Button } from './button.js';
import { Code } from './code.js';
import { IconButton } from './icon-button.js';
import { Pane } from './pane.js';
import { Tabs } from './tabs.js';

const meta: Meta = {
  component: Pane,
  args: {},
  argTypes: {
    variant: { control: 'select', options: ['root', 'nested', 'headless'] },
    scroll: { control: 'select', options: ['horizontal', 'vertical', 'both', 'none'] },
    padding: { control: 'select', options: ['default', 'none'] },
    tabs: { control: 'select', options: ['contained', 'underline'] },
    actions: { control: 'boolean', defaultValue: false },
    expandable: { control: 'boolean', defaultValue: false },
  },
};

export default meta;

export const Basic: StoryFn<any> = ({ padding, scroll, tabs, actions, ...args }) => (
  <Tabs defaultValue="2">
    <Pane {...args}>
      <Pane.Title>{args.title}</Pane.Title>
      <Pane.Description>{args.subtitle}</Pane.Description>
      {actions ? (
        <Pane.Actions>
          <Button size="md" variant="secondary">
            Button
          </Button>
          <IconButton icon={PlusIcon} label="Add something" size="md" variant="secondary" />
        </Pane.Actions>
      ) : null}
      {tabs ? (
        <Pane.Tabs>
          <Tabs.List variant={tabs}>
            <Tabs.Tab value="1">Summary</Tabs.Tab>
            <Tabs.Tab value="2">Long Text</Tabs.Tab>
          </Tabs.List>
        </Pane.Tabs>
      ) : null}

      <Pane.Body padding={padding} scroll={scroll}>
        {tabs ? (
          <>
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
          </>
        ) : (
          args.content
        )}
      </Pane.Body>
    </Pane>
  </Tabs>
);

Basic.args = {
  title: 'Pane Title',
  subtitle: 'Pane Subtitle',
  content: 'Pane Content',
  padding: 'default',
};

export const Expandable = Basic.bind({});

Expandable.args = {
  ...Basic.args,
  expandable: true,
};

export const WithActions: StoryFn<any> = Basic.bind({});

WithActions.args = {
  title: 'Pane Title',
  subtitle: '',
  content: 'Content',
  expandable: true,
  actions: true,
};

export const WithTabs: StoryFn<any> = Basic.bind({});

WithTabs.args = {
  title: 'Pane Title',
  subtitle: '',
  content: 'Content',
  variant: 'nested',
  expandable: false,
  tabs: 'underline',
};

export const WithCode = Basic.bind({});

WithCode.args = {
  variant: 'nested',
  title: 'JSON',
  subtitle: (
    <>
      You can also <Button variant="link">fetch notifications</Button> using the <Button variant="link">API</Button>.
    </>
  ),
  content: (
    <Code lang="json" showCopyButton={false} lineClamp={15} scroll="horizontal">
      {JSON.stringify([fake.notification, fake.notification, fake.notification], null, 2)}
    </Code>
  ),

  expandable: false,
};
