import { Slot, Slottable } from '@radix-ui/react-slot';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import { forwardRef } from 'react';

import { makeComponent } from '../lib/component';
import { ComponentProps, CSS, styled } from '../lib/stitches';

const StyledButton = styled('button', {
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
  font: '$body-default',
  borderRadius: '$base',
  fontWeight: '$normal',
  gap: '$2',

  '&:focus': { outline: 'none' },
  // use a data attribute for compatibility with as="a"
  '&[data-disabled]': { opacity: 0.65, pointerEvents: 'none' },

  variants: {
    size: {
      sm: { height: '$8', padding: '0 $3', font: '$caption' },
      md: { height: '$10', padding: '0 $4', font: '$body-small-bold' },
      lg: { height: '$12', padding: '0 $4', font: '$body-default' },
    },

    variant: {
      primary: {
        backgroundColor: '$primary-bg',
        color: '$text-default',

        '&:hover, &:focus-visible': {
          backgroundColor: '$primary-bg-hover',
        },

        '&:active': {
          backgroundColor: '$primary-bg-active',
        },
      },
      secondary: {
        backgroundColor: '$bg-default',
        color: '$text-default',

        '&:hover, &:focus-visible': {
          backgroundColor: '$bg-hover',
        },

        '&:active': {
          backgroundColor: '$bg-active',
        },
      },
      danger: {
        backgroundColor: '$error-bg-solid',
        color: '$text-default',

        '&:hover, &:focus-visible': {
          backgroundColor: '$error-bg-solid-hover',
        },

        '&:active': {
          backgroundColor: '$error-bg-solid',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$text-link',

        '&:hover, &:focus-visible': {
          backgroundColor: '$bg-hover',
        },

        '&:active': {
          backgroundColor: '$bg-active',
        },
      },
      link: {
        backgroundColor: 'transparent',
        color: '$text-link',
        height: 'auto',
        padding: '0 !important',

        '&:hover, &:focus-visible': {
          color: '$text-link-hover',
        },

        '&:active': {
          color: '$primary-bg-active',
        },
      },
    },
  },
});

const IconWrapper = styled('span', {
  display: 'inline-flex',
  flex: 'none',
  justifyContent: 'center',
  alignItems: 'center',

  '& > svg': {
    width: '$4',
    height: '$4',
  },
});

type StyledButtonProps = ComponentProps<typeof StyledButton>;

type ButtonProps = {
  /**
   * The button style
   */
  variant?: StyledButtonProps['variant'];
  /**
   * The size of the button
   */
  size?: StyledButtonProps['size'];
  /**
   * An optional icon to show before the button text.
   */
  leadingIcon?: FunctionComponent | ReactElement;
  /**
   * An optional icon to show after the button text.
   */
  trailingIcon?: FunctionComponent | ReactElement;
  /**
   * The text label to show on the button
   */
  children: ReactNode;
  /**
   * Event handler called when the button is clicked.
   */
  onClick?: StyledButtonProps['onClick'];
  /**
   * The name of the button. Submitted with its owning form as part of a name/value pair.
   */
  name?: StyledButtonProps['name'];
  /**
   * The type of button, this controls the action it takes when clicked in a form.
   */
  type?: StyledButtonProps['type'];
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;

  disabled?: StyledButtonProps['disabled'];
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { leadingIcon, trailingIcon, children, size = 'md', variant = 'primary', type = 'button', asChild, ...props },
  ref,
) {
  const LeadingIcon = makeComponent(leadingIcon);
  const TrailingIcon = makeComponent(trailingIcon);
  const Comp = asChild ? Slot : 'button';

  return (
    <StyledButton
      as={Comp}
      data-disabled={props.disabled || undefined}
      type={type}
      variant={variant}
      size={size}
      {...props}
      ref={ref}
    >
      {LeadingIcon && (
        <IconWrapper>
          <LeadingIcon />
        </IconWrapper>
      )}

      <Slottable>{children}</Slottable>

      {TrailingIcon && (
        <IconWrapper>
          <TrailingIcon />
        </IconWrapper>
      )}
    </StyledButton>
  );
});
