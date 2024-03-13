import * as React from 'react';

import { mapChildren } from '../lib/component.js';
import { ComponentProps, CSS, styled } from '../lib/stitches.js';
import { CopyButton } from './copy-button.js';

const StyledAddon = styled('div', {
  flex: 'none',
  pl: '$2',
});

const StyledItem = styled('div', {
  display: 'flex',
  font: '$body-small',

  '& dt': {
    truncate: true,
    flex: 'none',
    color: '$text-muted',
  },

  '& dd': {
    color: '$text-default',
  },

  variants: {
    truncate: {
      true: {
        '& dd': {
          truncate: true,
        },

        [`& ${StyledAddon}`]: {
          display: 'none',
        },
      },
    },

    stacked: {
      true: {
        flexDirection: 'column',
        gap: '0',
        '&& dt': {
          width: 'unset',
        },
      },
      false: {
        flexDirection: 'row',
        '&& dt': {
          pr: '$4',
        },
      },
    },

    labelWidth: {
      sm: { '& dt': { width: '$40' } },
      md: { '& dt': { width: '$50' } },
      lg: { '& dt': { width: '$60' } },
    },
  },

  [`& ${StyledAddon}`]: {
    transition: 'opacity 0.2s ease',
    opacity: 0,
  },

  [`&:hover ${StyledAddon}`]: {
    opacity: 1,
    display: 'block',
  },
});

const StyledValue = styled('div', {
  display: 'flex',
  minWidth: 1,
  position: 'relative',

  variants: {
    muted: {
      true: {
        '& dt': {
          color: '$text-muted',
        },
      },
    },
  },
});

type StyledItemProps = ComponentProps<typeof StyledItem>;

type ItemProps = {
  /**
   * Whether to stack the label and value vertically or not. This property is
   * usually controlled via the `variant` property of the parent component.
   */
  stacked?: StyledItemProps['stacked'];
  /**
   * The width of the label column. Only applies to the table variant.
   */
  labelWidth?: StyledItemProps['labelWidth'];
  /**
   * A short description of what the value represents. This will be shown before
   * or above the value.
   */
  label: React.ReactNode;
  /**
   * The value to display.
   */
  value: React.ReactNode;
  /**
   * The value to copy to the clipboard when the copy button is clicked. Defaults
   * to `value`.
   */
  copyValue?: string | null;
  /**
   * Only show the first line of the value and truncate the rest.
   */
  truncate?: boolean;
  /**
   * Hide or show the copy button. Defaults to `true`.
   */
  showCopyButton?: boolean;
} & StyledItemProps;

const Item = React.forwardRef<React.ElementRef<'div'>, ItemProps>(function Item(
  {
    stacked = false,
    labelWidth = 'sm',
    label,
    value,
    copyValue = value,
    truncate = false,
    showCopyButton = true,
    ...props
  },
  ref,
) {
  const hasValue = value != null;

  return (
    <StyledItem stacked={stacked} labelWidth={labelWidth} truncate={truncate} {...props} ref={ref}>
      <dt>{label}</dt>
      <StyledValue muted={!hasValue}>
        <dd>{hasValue ? value : 'n/a'}</dd>
        {hasValue && showCopyButton && (
          <StyledAddon>
            <CopyButton variant="text" value={String(copyValue)} />
          </StyledAddon>
        )}
      </StyledValue>
    </StyledItem>
  );
});

const StyledList = styled('dl', {
  all: 'unset',
  margin: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  width: '100%',
  listStyle: 'none',
  gap: '0.125rem', // can't use theme token smaller than $1 (4px)
});

type RootProps = {
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
  /**
   * The style in which to render the description list.
   */
  variant?: 'stacked' | 'table';
  /**
   * The width of the label column. Only applies to the table variant.
   */
  labelWidth?: StyledItemProps['labelWidth'];
  /**
   * The children to render, usually `DescriptionList.Item` components.
   */
  children?: React.ReactNode;
  /**
   * Only show the first line of the value and truncate the rest.
   */
  truncate?: boolean;
};

const Root = React.forwardRef<HTMLDListElement, RootProps>(function DescriptionList(
  { variant = 'table', labelWidth = 'sm', children, truncate, ...props },
  ref,
) {
  return (
    <StyledList {...props} ref={ref}>
      {mapChildren(children, (child) =>
        React.cloneElement(child, { labelWidth, stacked: variant === 'stacked', truncate, ...child.props }),
      )}
    </StyledList>
  );
});

export const DescriptionList = Object.assign(Root, {
  Item,
});
