import * as TabsPrimitive from '@radix-ui/react-tabs';
import { isPrimitive } from 'is-what';
import * as React from 'react';
import { isElement } from 'react-is';

import { makeComponent } from '../lib/component.js';
import { ComponentProps, styled } from '../lib/stitches.js';

const StyledTabs = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
});

type StyledListProps = ComponentProps<typeof StyledList>;
const StyledList = styled(TabsPrimitive.List, {
  display: 'flex',

  variants: {
    size: {
      md: {
        height: '$8',
      },
      lg: {
        height: '$10',
      },
    },

    variant: {
      underline: {
        gap: '$4',
        width: 'auto',
        borderBottom: '1px solid $border-muted',
      },

      contained: {
        width: 'fit-content',
        backgroundColor: '$bg-default',
        borderRadius: '$base',
      },
    },
  },
});

type ListProps = {
  /**
   * The variant to use for the Tab components.
   */
  variant?: StyledListProps['variant'];
  /**
   * The size to use for the Tab components.
   */
  size?: StyledListProps['size'];
} & ComponentProps<typeof StyledList>;

const List = React.forwardRef<React.ElementRef<typeof StyledList>, ListProps>(function List(
  { children, variant = 'underline', size = 'md', ...props },
  ref,
) {
  return (
    <StyledList variant={variant} size={size} {...props} ref={ref}>
      {React.Children.map(children, (child) =>
        isElement(child) ? React.cloneElement(child, { variant, size, ...child.props }) : child,
      )}
    </StyledList>
  );
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  backgroundColor: 'transparent',
  display: 'inline-flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  cursor: 'pointer',

  userSelect: 'none',
  whiteSpace: 'nowrap',
  gap: '$2',

  variants: {
    size: {
      md: {
        height: '$8',
      },
      lg: {
        height: '$10',
      },
    },
    variant: {
      underline: {
        font: '$body-small',
        color: '$text-muted',
        borderBottom: '2px solid transparent',
        '&:hover, &:focus-visible': { color: '$text-default' },
        '&[data-state="active"]': { color: '$text-dfault', borderColor: '$text-link' },
      },

      contained: {
        padding: '0 $3',
        font: '$body-small-bold',
        color: '$text-default',
        borderRadius: '$base',
        '&:hover, &:focus-visible': { background: '$bg-hover' },
        '&[data-state="active"]': { background: '$primary-bg' },
      },
    },
  },
  compoundVariants: [{ variant: 'underline', size: 'lg', css: { font: '$body-default' } }],
});

const TabAddon = styled('div', {
  font: '$caption',
  height: '$4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',

  variants: {
    type: {
      count: {},
      icon: {},
    },

    variant: {
      contained: {},
      underline: {
        padding: '0 $1',
        borderRadius: '$base',
      },
    },
  },

  compoundVariants: [{ type: 'count', variant: 'underline', css: { backgroundColor: '$bg-default' } }],
});

type TabProps = {
  children?: string;
  addon?: React.FunctionComponent | React.ReactElement | string | number;
} & ComponentProps<typeof StyledTrigger>;

const Tab = React.forwardRef<React.ElementRef<typeof StyledTrigger>, TabProps>(function Trigger(
  { addon, variant = 'underline', size = 'md', children, ...props },
  ref,
) {
  const Addon = makeComponent(addon);

  return (
    <StyledTrigger variant={variant} size={size} {...props} ref={ref}>
      {children}
      {Addon && (
        <TabAddon variant={variant} type={isPrimitive(addon) ? 'count' : 'icon'}>
          <Addon />
        </TabAddon>
      )}
    </StyledTrigger>
  );
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  outline: 'none',
  '&:focus': { outline: 'none' },
});

const TabPanels = styled('div', {});

type StyledTabsProps = ComponentProps<typeof StyledTabs>;

type TabsProps = {
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: StyledTabsProps['onValueChange'];
  children?: React.ReactNode;
} & StyledTabsProps;

const Root = React.forwardRef<React.ElementRef<typeof StyledTabs>, TabsProps>(function Tabs(
  { children, ...props },
  ref,
) {
  const hasSingleChild = React.Children.toArray(children).length === 1;

  return (
    <StyledTabs asChild={hasSingleChild} {...props} ref={ref}>
      {children}
    </StyledTabs>
  );
});

export const Tabs = Object.assign(Root, {
  List,
  Tab,
  Panels: TabPanels,
  Panel: StyledContent,
});
