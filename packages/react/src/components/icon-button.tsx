import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import type { FunctionComponent, ReactElement } from 'react';
import { forwardRef } from 'react';
import invariant from 'tiny-invariant';

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
  borderRadius: '$base',

  '&:focus': { outline: 'none' },
  '&&:disabled': { opacity: 0.65, pointerEvents: 'none' },

  variants: {
    size: {
      xs: { height: '$6', width: '$6' },
      sm: { height: '$8', width: '$8' },
      md: { height: '$10', width: '$10' },
      lg: { height: '$12', width: '$12' },
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
        backgroundColor: 'transparent',
        color: '$text-error',

        '&:hover, &:focus-visible': {
          backgroundColor: '$error-bg-hover',
        },

        '&:active': {
          backgroundColor: '$error-bg-active',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$text-default',

        '&:hover, &:focus-visible': {
          backgroundColor: '$bg-hover',
        },

        '&:active': {
          backgroundColor: '$bg-active',
        },
      },
      inline: {
        backgroundColor: 'transparent',
        color: '$text-link',
        height: 'auto',
        width: 'auto',

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
   * The icon to display in the button.
   */
  icon: FunctionComponent | ReactElement;
  /**
   * The accessible label for the button. This label will be visually hidden but announced to screen reader users, similar to `alt` text for `img` tags.
   */
  label: string;
  /**
   * The button style.
   */
  variant?: StyledButtonProps['variant'];
  /**
   * The size of the button. Has no effect on inline buttons.
   */
  size?: StyledButtonProps['size'];
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
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
} & StyledButtonProps;

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { icon, label, size = 'md', variant = 'primary', type = 'button', ...props },
  ref,
) {
  const Icon = makeComponent(icon);
  invariant(Icon, 'IconButton requires element or component as icon prop');

  return (
    <StyledButton type={type} variant={variant} size={size} {...props} ref={ref}>
      <IconWrapper>
        <AccessibleIcon label={label}>
          <Icon />
        </AccessibleIcon>
      </IconWrapper>
    </StyledButton>
  );
});
