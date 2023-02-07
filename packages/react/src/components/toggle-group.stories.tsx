/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChatBubbleIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';

import { Icon } from './icon';
import { ToggleGroup } from './toggle-group';

const meta = {
  component: ToggleGroup,
  args: {
    type: 'single',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    type: { control: 'select', options: ['single', 'multiple'] },
    width: { control: 'select', options: ['3xs', 'hug'] },
  },
};

export default meta;

// @ts-ignore
export const Basic = ({ size, type, width }) => (
  <ToggleGroup size={size} type={type} fullWidth>
    <ToggleGroup.Item width={width} value="all">
      All
    </ToggleGroup.Item>
    <ToggleGroup.Item width={width} value="email">
      Email
    </ToggleGroup.Item>
    <ToggleGroup.Item width={width} value="SMS">
      SMS
    </ToggleGroup.Item>
  </ToggleGroup>
);

Basic.args = {
  size: 'md',
  type: 'single',
  width: 'hug',
};

// @ts-ignore
export const WithIcons = ({ size, type, width }) => (
  <ToggleGroup size={size} type={type}>
    <ToggleGroup.Item width={width} value="all">
      All
    </ToggleGroup.Item>
    <ToggleGroup.Item width={width} value="email">
      <Icon icon={EnvelopeClosedIcon} />{' '}
    </ToggleGroup.Item>
    <ToggleGroup.Item width={width} value="SMS">
      <Icon icon={ChatBubbleIcon} />
    </ToggleGroup.Item>
  </ToggleGroup>
);

WithIcons.args = {
  size: 'md',
  type: 'single',
  width: '3xs',
};
