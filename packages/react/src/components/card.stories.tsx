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
  argTypes: {},
};

export default meta;

export const Basic: ComponentStoryFn<any> = (args) => (
  <Card>
    <Card.Title>{args.title}</Card.Title>
    <Card.Description>{args.subtitle}</Card.Description>

    <Card.Body>Card content</Card.Body>
  </Card>
);

Basic.args = {
  title: 'Card Title',
  subtitle: 'Card Subtitle',
  content: 'Card Content',
};

export const Expandable: ComponentStoryFn<any> = (args) => (
  <Card expandable={args.expandable}>
    <Card.Title>{args.title}</Card.Title>
    <Card.Description>{args.subtitle}</Card.Description>

    <Card.Body>Card content</Card.Body>
  </Card>
);

Expandable.args = {
  ...Basic.args,
  expandable: true,
};

export const WithActions: ComponentStoryFn<any> = (args) => (
  <Tabs defaultValue="2">
    <Card expandable={args.expandable}>
      <Card.Title>{args.title}</Card.Title>
      <Card.Description>{args.subtitle}</Card.Description>
      <Card.Actions>
        <Button size="md" variant="secondary">
          Button
        </Button>
        <IconButton icon={PlusIcon} label="Add something" size="md" variant="secondary" />
      </Card.Actions>
      <Card.Tabs>
        <Tabs.List>
          <Tabs.Tab value="1">Summary</Tabs.Tab>
          <Tabs.Tab value="2">Long Text</Tabs.Tab>
        </Tabs.List>
      </Card.Tabs>

      <Card.Body>
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
      </Card.Body>
    </Card>
  </Tabs>
);

WithActions.args = {
  title: 'Card Title',
  subtitle: '',
  content: 'Content',
  expandable: true,
};

export const WithTabs: ComponentStoryFn<any> = (args) => (
  <Tabs defaultValue="2">
    <Card expandable={args.expandable}>
      <Card.Title>{args.title}</Card.Title>
      <Card.Description>{args.subtitle}</Card.Description>

      <Card.Tabs>
        <Tabs.List>
          <Tabs.Tab value="1">Summary</Tabs.Tab>
          <Tabs.Tab value="2">Long Text</Tabs.Tab>
        </Tabs.List>
      </Card.Tabs>

      <Card.Body>
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
      </Card.Body>
    </Card>
  </Tabs>
);

WithTabs.args = {
  title: 'Card Title',
  subtitle: '',
  content: 'Content',
  expandable: false,
};

export const WithCode: ComponentStoryFn<any> = (args) => (
  <Card expandable={args.expandable}>
    {({ expanded }) => (
      <>
        <Card.Title>{args.title}</Card.Title>
        <Card.Description>{args.subtitle}</Card.Description>

        <Card.Body>
          <Code lang="json" showCopyButton={false} lineClamp={expanded ? 0 : 15} scroll="horizontal">
            {JSON.stringify([fake.notification, fake.notification, fake.notification], null, 2)}
          </Code>
        </Card.Body>
      </>
    )}
  </Card>
);

WithCode.args = {
  title: 'JSON',
  subtitle: (
    <>
      You can also <Button variant="link">fetch notifications</Button> using the <Button variant="link">API</Button>.
    </>
  ),
  expandable: true,
};
