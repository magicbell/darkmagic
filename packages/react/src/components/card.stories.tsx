import { PlusIcon } from '@radix-ui/react-icons';
import { ComponentStoryFn, Meta } from '@storybook/react';

import * as fake from '~/fixtures';

import { Button } from './button';
import { Card } from './card';
import { Code } from './code';
import { IconButton } from './icon-button';
import { Tabs } from './tabs';

const meta: Meta = {
  component: Card,
  args: {},
  argTypes: {
    variant: { control: 'select', options: ['outline', 'filled'] },
    scroll: { control: 'select', options: ['horizontal', 'vertical', 'both', 'none'] },
    padding: { control: 'select', options: ['default', 'none'] },
    tabs: { control: 'select', options: ['contained', 'underline'] },
    actions: { control: 'boolean', defaultValue: false },
    expandable: { control: 'boolean', defaultValue: false },
  },
};

export default meta;

export const Basic: ComponentStoryFn<any> = ({ padding, actions, tabs, scroll, ...args }) => (
  <Tabs defaultValue="2">
    <Card {...args}>
      <Card.Title>{args.title}</Card.Title>
      <Card.Description>{args.subtitle}</Card.Description>
      {actions ? (
        <Card.Actions>
          <Button size="md" variant="secondary">
            Button
          </Button>
          <IconButton icon={PlusIcon} label="Add something" size="md" variant="secondary" />
        </Card.Actions>
      ) : null}
      {tabs ? (
        <Card.Tabs>
          <Tabs.List variant={tabs}>
            <Tabs.Tab value="1">Summary</Tabs.Tab>
            <Tabs.Tab value="2">Long Text</Tabs.Tab>
          </Tabs.List>
        </Card.Tabs>
      ) : null}

      <Card.Body scroll={scroll}>
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
      </Card.Body>
    </Card>
  </Tabs>
);

Basic.args = {
  title: 'Card Title',
  subtitle: 'Card Subtitle',
  content: 'Card Content',
};

export const Expandable = Basic.bind({});

Expandable.args = {
  ...Basic.args,
  expandable: true,
};

export const WithActions = Basic.bind({});

WithActions.args = {
  title: 'Card Title',
  subtitle: '',
  content: 'Content',
  expandable: true,
  actions: true,
};

export const WithTabs = Basic.bind({});

WithTabs.args = {
  title: 'Card Title',
  subtitle: '',
  content: 'Content',
  expandable: false,
  tabs: 'underline',
};

export const WithCode = Basic.bind({});

WithCode.args = {
  title: 'JSON',
  subtitle: (
    <>
      You can also <Button variant="link">fetch notifications</Button> using the <Button variant="link">API</Button>.
    </>
  ),
  expandable: true,
  content: (
    <Code lang="json" showCopyButton={false} lineClamp={15} scroll="horizontal">
      {JSON.stringify([fake.notification, fake.notification, fake.notification], null, 2)}
    </Code>
  ),
};
