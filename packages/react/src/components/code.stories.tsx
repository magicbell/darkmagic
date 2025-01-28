import { Meta } from '@storybook/react';

import * as fake from '../../fixtures/index.js';
import { Code } from './code.js';

const meta: Meta = {
  component: Code,
  args: {
    lang: 'json',
    caption: 'JSON',
    lineClamp: 17,
    bg: 1,
  },
  argTypes: {
    bg: { control: 'select', options: [1, 2, 3] },
    padding: { control: 'select', options: ['none', 'sm', 'md'] },
  },
};

export default meta;

export const Json = {
  args: {
    lang: 'json',
    caption: 'JSON',
    children: JSON.stringify(fake.notification),
  },
};

export const React = {
  args: {
    caption: 'REACT',
    lang: 'tsx',
    lineClamp: 17,
    children: `import React from "react";
import ReactDOM from "react-dom";
import MagicBell, { FloatingNotificationInbox } from "@magicbell/magicbell-react";

const theme = {"icon":{"borderColor":"#5225C1","width":"24px"},"unseenBadge":{"backgroundColor":"#F80808"}};

/**
 * You can use userExternalId instead of the userEmail - https://bit.ly/3oiDSAe
 */
ReactDOM.render(
  <MagicBell
    apiKey="74ef9cfa81a890814732b624c2664cfefeaa63d0"
    userEmail="stephan@magicbell.io"
    theme={theme}
    locale="en"
  >
    {(props) => <FloatingNotificationInbox width={400} height={500} {...props} />}
  </MagicBell>,
  document.body,
);`,
  },
};

export const NoHeader = {
  args: {
    ...Json.args,
    caption: undefined,
    showCopyButton: false,
  },
};
