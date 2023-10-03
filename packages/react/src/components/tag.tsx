import { Cross2Icon } from '@radix-ui/react-icons';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import * as React from 'react';

import { makeComponent } from '../lib/component.js';
import { ComponentProps, CSS, styled } from '../lib/stitches.js';

const StyledTag = styled('div', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  // Custom reset
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: '$normal',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  borderRadius: '$full',
  border: '1px solid $border-default',

  '&:focus': { outline: 'none' },
  '&&:disabled': { opacity: 0.65, pointerEvents: 'none' },

  '& svg': {
    flex: 'none',
  },

  '& > *': {
    py: 1,
  },

  variants: {
    size: {
      xs: {
        height: '$6',
        '& > :first-child': { pl: '$2', borderLeftRadius: '$full' },
        '& > :last-child': { pr: '$2', borderRightRadius: '$full' },
        font: '$caption',
      },
      sm: {
        height: '$8',
        '& > :first-child': { pl: '$3', borderLeftRadius: '$full' },
        '& > :last-child': { pr: '$3', borderRightRadius: '$full' },
        font: '$body-small-bold',
      },
    },
  },
});

const buttonReset = {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  // Custom reset
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: '$normal',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
};

type StyledButtonProps = ComponentProps<typeof StyledButton>;
const StyledButton = styled('button', {
  ...buttonReset,

  // Custom
  gap: '$1',
  height: '100%',

  '&[type="button"]:hover, &[type="button"]:focus-visible': {
    background: '$bg-hover',
  },
  '&[type="button"]:active': {
    background: '$bg-active',
  },
});

type StyledDismissButtonProps = ComponentProps<typeof StyledDismissButton>;
const StyledDismissButton = styled('button', {
  ...buttonReset,

  // Custom
  color: '$text-link',
  pl: '$1',
  height: '100%',

  '&:hover, &:focus-visible': {
    color: '$text-link-hover',
    background: '$bg-hover',
  },

  '&:active': {
    color: '$primary-bg-active',
    background: '$bg-active',
  },
});

const Label = styled('span', {
  display: 'inline-block',
  padding: '0 $1',
});

type StyledTagProps = ComponentProps<typeof StyledTag>;

type TagProps = {
  /**
   * The size of the tag
   */
  size?: StyledTagProps['size'];
  /**
   * An optional icon to show before the label.
   */
  icon?: React.FunctionComponent | React.ReactElement;
  /**
   * The text label to show on the tag
   */
  children: React.ReactNode;
  /**
   * Event handler called when the label is clicked. Providing an onClick handler
   * will render the tag as a button element.
   */
  onClick?: StyledButtonProps['onClick'];
  /**
   * Event handler called when the label is dismissed. Providing an onDismiss handler
   * will render the tag with a dismiss button.
   */
  onDismiss?: StyledDismissButtonProps['onClick'];
  /**
   * The name of the button. Submitted with its owning form as part of a name/value pair.
   */
  name?: string;
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
} & StyledTagProps;

export const Tag = React.forwardRef<React.ElementRef<typeof StyledTag>, TagProps>(function Button(
  { icon, children, size = 'sm', onDismiss, onClick, ...props },
  ref,
) {
  const Icon = makeComponent(icon);
  const buttonProps: StyledButtonProps & { as?: string } = onClick ? { type: 'button', onClick } : { as: 'div' };

  return (
    <StyledTag size={size} {...props} ref={ref}>
      <StyledButton {...buttonProps}>
        {Icon && <Icon />}

        <Label>{children}</Label>
      </StyledButton>

      {onDismiss && (
        <StyledDismissButton type="button" onClick={onDismiss}>
          <Cross2Icon />
          <VisuallyHidden>dismiss</VisuallyHidden>
        </StyledDismissButton>
      )}
    </StyledTag>
  );
});
