import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

import { ComponentProps, CSS, styled } from '../lib/stitches';

const StyledTextArea = styled('textarea', {
  unset: 'all',
  boxSizing: 'border-box',
  appearance: 'none',
  borderWidth: '0',
  fontFamily: 'inherit',
  margin: '0',
  outline: 'none',
  padding: '0',
  width: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  boxShadow: 'none',
  fontVariantNumeric: 'tabular-nums',
  position: 'relative',
  resize: 'none',
  border: '1px solid transparent',

  backgroundColor: '$bg-default',
  color: '$text-default',
  font: '$body-default',
  borderRadius: '$base',

  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  '&:hover': { backgroundColor: '$bg-hover' },
  '&:focus, &:focus-within, &:active': { backgroundColor: `$bg-active` },
  '&::placeholder': { color: '$text-muted' },

  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.65,
    resize: 'none',
  },

  variants: {
    size: {
      xs: {
        minHeight: '$10',
        lineHeight: '$sizes$10',
        padding: '0 calc($3 - 1px)',
      },
      sm: {
        minHeight: '$20',
        padding: 'calc($1 - 1px) calc($3 - 1px)',
      },
      md: {
        minHeight: '$30',
        padding: 'calc($2 - 1px) calc($3 - 1px)',
      },
      lg: {
        minHeight: '$40',
        padding: 'calc($3 - 1px) calc($3 - 1px)',
      },
    },

    state: {
      initial: {},
      invalid: {
        borderColor: '$error-bg-solid',
        backgroundColor: '$error-bg-hover',
      },
    },
  },
});

type StyledTextAreaProps = ComponentProps<typeof StyledTextArea>;

type TextAreaProps = {
  /**
   * The content that will be rendered inside the `textarea` when no `value` or `defaultValue` is set.   */
  placeholder?: string;
  /**
   * Disabled elements can't be interacted with.
   */
  disabled?: boolean;
  /**
   * Required elements must be filled out before the form can be submitted.
   */
  required?: boolean;
  /**
   * The size of the textarea.
   */
  size?: StyledTextAreaProps['size'];
  /**
   * The state of the textarea.
   */
  state?: StyledTextAreaProps['state'];
  /**
   * The value of the textarea when initially rendered. Use when you do not need to control the state of the textarea.
   */
  defaultValue?: StyledTextAreaProps['defaultValue'];
  /**
   * The controlled value of the select. Should be used in conjunction with `onValueChange`.
   */
  value?: StyledTextAreaProps['value'];
  /**
   * Event handler called when the value changes.
   */
  onChange?: StyledTextAreaProps['onChange'];
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
  asChild?: boolean;
} & StyledTextAreaProps;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { size = 'md', state = 'initial', disabled = false, required = false, asChild, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'textarea';
  return (
    <StyledTextArea
      as={Comp}
      size={size}
      state={state}
      disabled={disabled}
      required={required}
      rows={size === 'xs' ? 1 : undefined}
      autoComplete="off"
      autoCorrect="off"
      data-lpignore="true"
      data-form-type="other"
      spellCheck={false}
      {...props}
      ref={ref}
    />
  );
});
