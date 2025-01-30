import * as React from 'react';

import { makeComponent } from '../lib/component.js';
import { ComponentProps, CSS, styled } from '../lib/stitches.js';

const StyledRoot = styled('div', {
  all: 'unset',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  width: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '$base',
  padding: '0 calc($2 - 1px)',
  font: '$body-default',
  minWidth: 250,
  backgroundColor: '$bg-default',
  color: '$text-default',
  position: 'relative',
  border: '1px solid transparent',

  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  '&:hover': { backgroundColor: '$bg-hover' },
  '&:focus, &:active, &:focus-within': { backgroundColor: `$bg-active` },
  '& input::placeholder': { color: '$text-muted' },
  '&[data-disabled]': { opacity: 0.65, pointerEvents: 'none' },

  '&:-webkit-autofill': { boxShadow: 'none' },
  '&:-webkit-autofill::first-line': { color: '$text-highlight' },

  variants: {
    numeric: {
      true: {
        fontVariantNumeric: 'tabular-nums',
      },
    },
    size: {
      sm: {
        height: '$8',
        font: '$body-small',
      },
      md: {
        height: '$10',
      },
      lg: {
        height: '$12',
      },
    },

    state: {
      initial: {},
      invalid: {
        backgroundColor: '$error-bg-hover',
        borderColor: '$error-bg-solid',
      },
    },
  },
});

const StyledInput = styled('input', {
  all: 'unset',
  appearance: 'none',
  borderWidth: '0',
  fontFamily: 'inherit',
  margin: '0',
  outline: 'none',
  width: '100%',
  height: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  fontVariantNumeric: 'inherit',
  backgroundColor: 'transparent',
  color: 'inherit',
  padding: '0 $1',
});

type StyledInputProps = ComponentProps<typeof StyledInput>;

const StyledAddon = styled('span', {
  display: 'inline-flex',
  flex: 'none',
  padding: '0 $1',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$text-muted',
});

type StyledRootProps = ComponentProps<typeof StyledRoot>;

type InputProps = {
  /**
   * What to display when no value is entered.
   */
  placeholder?: string;
  /**
   * An element to attach to the input, placed before the value
   */
  leadingAddon?: React.FunctionComponent | React.ReactElement;
  /**
   * An element to attach to the input, placed after the value
   */
  trailingAddon?: React.FunctionComponent | React.ReactElement;
  /**
   * The element size
   */
  size?: StyledRootProps['size'];
  /**
   * The state of the element
   */
  state?: StyledRootProps['state'];
  /**
   * Disabled elements can't be interacted with.
   */
  disabled?: boolean;
  /**
   * Required elements must be filled out before the form can be submitted.
   */
  required?: boolean;
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;

  /**
   * A callback that is triggered when the value changes.
   */
  onValueChange?: (value: string) => void | undefined;
} & Omit<StyledRootProps, 'onChange'> &
  Omit<StyledInputProps, 'size'>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    // omit
    children,

    // custom
    leadingAddon,
    trailingAddon,

    // root
    size = 'md',
    state = 'initial',
    disabled = false,
    required = false,
    css,
    className,
    onChange,
    onValueChange,

    // input
    ...props
  },
  ref,
) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (event) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
    },
    [onChange, onValueChange],
  );

  if (props.type === 'hidden') {
    return <input disabled={disabled} required={required} {...props} ref={ref} />;
  }

  const LeadingAddon = makeComponent(leadingAddon);
  const TrailingAddon = makeComponent(trailingAddon);

  return (
    <StyledRoot data-disabled={disabled || undefined} size={size} state={state} css={css} className={className}>
      {LeadingAddon && (
        <StyledAddon>
          <LeadingAddon />
        </StyledAddon>
      )}

      <StyledInput
        disabled={disabled}
        required={required}
        autoComplete="off"
        autoCorrect="off"
        data-lpignore="true"
        data-form-type="other"
        spellCheck={false}
        {...props}
        onChange={handleChange}
        ref={ref}
      />

      {TrailingAddon && (
        <StyledAddon>
          <TrailingAddon />
        </StyledAddon>
      )}
    </StyledRoot>
  );
});
