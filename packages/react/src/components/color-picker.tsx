import { useComposedRefs } from '@radix-ui/react-compose-refs';
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  FunctionComponent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HexColorPicker } from 'react-colorful';

import { ComponentProps, CSS, styled } from '../lib/stitches';
import { makeComponent } from '../lib/component';
import { triggerChange } from '../lib/dom';

const StyledRoot = styled('div', {
  all: 'unset',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  width: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  fontVariantNumeric: 'tabular-nums',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '$base',
  padding: '0 calc($2 - 1px) 0 0',
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
  fontVariantNumeric: 'tabular-nums',
  backgroundColor: 'transparent',
  color: 'inherit',
  padding: '0 $1',
});

type StyledInputProps = ComponentProps<typeof StyledInput>;

const StyledSquare = styled('div', {
  flex: 'none',
  width: '$10',
  height: '100%',
  borderLeftRadius: '$base',
  marginRight: '$2',
});

const StyledAddon = styled('span', {
  display: 'inline-flex',
  flex: 'none',
  padding: '0 $1',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$text-muted',
});

type StyledRootProps = ComponentProps<typeof StyledRoot>;

const StyledColorPicker = styled(HexColorPicker, {
  '&&': {
    position: 'absolute',
    top: 'calc(100% + $2)',
    left: 0,
    width: '100%',
  },
});

type InputProps = {
  /**
   * What to display when no value is entered.
   */
  placeholder?: string;
  /**
   * An element to attach to the input, placed before the value
   */
  leadingAddon?: FunctionComponent | ReactElement;
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
   * The value of the input that should be initially rendered. Use when you do not need to control the state of the input.
   */
  defaultValue?: string;
  /**
   * The controlled value of the input. Should be used in conjunction with onChange.
   */
  value?: string;
  /**
   * Event handler called when the value changes.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & Omit<StyledRootProps, 'onChange'> &
  Omit<StyledInputProps, 'size' | 'value' | 'onChange'>;

export const ColorPicker = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    // omit
    children,

    // custom
    leadingAddon = '#',

    // root
    size = 'md',
    state = 'initial',
    disabled = false,
    required = false,
    css,

    // input
    value: valueFromProps,
    onChange,
    onFocus,
    onBlur,
    defaultValue = '#6E56CF',

    ...props
  },
  forwardedRef,
) {
  const LeadingAddon = makeComponent(leadingAddon);

  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, inputRef);

  const isControlled = typeof valueFromProps != 'undefined';
  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = valueFromProps ?? internalValue;
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onBlur?.(event);
    // setIsPickerVisible(false);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    onFocus?.(event);
    setIsPickerVisible(true);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);

    if (!isControlled) {
      setInternalValue(event.target.value);
    }
  };

  useEffect(() => {
    if (!isPickerVisible) return;

    const fn = (event: MouseEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setIsPickerVisible(false);
    };

    document.body.addEventListener('click', fn);
    return () => document.body.removeEventListener('click', fn);
  }, [isPickerVisible]);

  return (
    <StyledRoot ref={rootRef} data-disabled={disabled || undefined} size={size} state={state} css={css}>
      <StyledSquare css={{ backgroundColor: value }} />

      {LeadingAddon && (
        <StyledAddon>
          <LeadingAddon />
        </StyledAddon>
      )}

      <StyledInput
        disabled={disabled}
        required={required}
        {...props}
        value={value?.replace('#', '')}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={composedRefs}
      />

      {/* The color picker doesn't directly write to state, it updates the input, and the input triggers the change. That
       way the consumer does not see a difference between a change event triggered by input or color picker. */}
      {isPickerVisible ? (
        <StyledColorPicker color={value} onChange={(color) => triggerChange(inputRef.current, color)} />
      ) : null}
    </StyledRoot>
  );
});
