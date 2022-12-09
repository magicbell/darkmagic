import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ComponentStoryFn, Meta } from '@storybook/react';

import * as fake from '~/fixtures';
import { Button } from './button';
import { Code } from './code';
import { DescriptionList } from './description-list';
import { IconButton } from './icon-button';
import { Pane } from './pane';
import { Tabs } from './tabs';

const meta: Meta = {
  component: Pane,
  args: {},
  argTypes: {},
};

export default meta;

export const Basic: ComponentStoryFn<any> = (args) => (
  <Pane>
    <Pane.Title>{args.title}</Pane.Title>
    <Pane.Body>Pane body</Pane.Body>
  </Pane>
);

Basic.args = {
  title: 'Pane Title',
  description: 'Pane Subtitle',
  body: 'Pane Content',
};

export const WithActions: ComponentStoryFn<any> = (args) => (
  <Tabs defaultValue="2">
    <Pane>
      <Pane.Title>{args.title}</Pane.Title>
      <Pane.Description>{args.description}</Pane.Description>
      <Pane.Actions>
        <Button size="md" variant="secondary">
          Button
        </Button>
        <IconButton icon={DotsHorizontalIcon} label="Add something" size="md" variant="secondary" />
      </Pane.Actions>

      <Pane.Body>
        <Tabs.Panel value="1">Tab 1 {args.body}</Tabs.Panel>
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
        <Tabs.Panel value="3">And more</Tabs.Panel>
      </Pane.Body>
    </Pane>
  </Tabs>
);

WithActions.args = {
  title: 'Pane Title',
  description: '',
  body: 'Content',
  expandable: true,
};

export const WithTabs: ComponentStoryFn<any> = (args) => (
  <Tabs defaultValue="2" {...args}>
    <Pane>
      <Pane.Title>{args.title}</Pane.Title>
      <Pane.Tabs>
        <Tabs.List>
          <Tabs.Tab value="1">Summary</Tabs.Tab>
          <Tabs.Tab value="2">Long Text</Tabs.Tab>
        </Tabs.List>
      </Pane.Tabs>

      <Pane.Body>
        <Tabs.Panel value="1">Tab 1 {args.body}</Tabs.Panel>
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
      </Pane.Body>
    </Pane>
  </Tabs>
);

WithTabs.args = {
  title: 'Pane Title',
  description: '',
  body: 'Content',
};

export const WithCode: ComponentStoryFn<any> = (args) => (
  <Pane>
    <Pane.Title>{args.title}</Pane.Title>
    <Pane.Description>{args.description}</Pane.Description>

    <Pane.Body>
      <Code lang="json" showCopyButton={false} lineClamp={15} scroll="horizontal">
        {JSON.stringify([fake.notification, fake.notification, fake.notification], null, 2)}
      </Code>
    </Pane.Body>
  </Pane>
);

WithCode.args = {
  title: 'JSON',
  description: (
    <>
      You can also <Button variant="link">fetch notifications</Button> using the <Button variant="link">API</Button>.
    </>
  ),
};

export const WithDescriptList: ComponentStoryFn<any> = (args) => (
  <Pane spacing="md" {...args}>
    <Pane.Title>{args.title}</Pane.Title>
    <Pane.Body>
      <DescriptionList>
        <DescriptionList.Item label="Name" value={args.name} />
        <DescriptionList.Item label="Email" value={args.email} />
        <DescriptionList.Item label="Phone" value={args.phone} />
      </DescriptionList>
    </Pane.Body>
  </Pane>
);

WithDescriptList.args = {
  title: 'Pane Title',
  name: 'Person Doe',
  email: 'person@example.com',
  phone: '123-456-7890',
};
