import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useId } from '@radix-ui/react-id';
import React, { forwardRef, ReactNode } from 'react';

import { Flex } from './flex';
import { RequiredBadge } from './required-badge';
import { ComponentProps, CSS, styled } from '../lib/stitches';

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  appearance: 'none',
  boxSizing: 'border-box',
  userSelect: 'none',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  padding: '0',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  overflow: 'hidden',

  width: '$6',
  height: '$6',
  borderRadius: '$base',

  backgroundColor: '$bg-active',
  color: '$text-default',
  border: '1px solid transparent',

  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  '&:hover': {
    backgroundColor: '$bg-hover',
    borderColor: '$border-highlight',
  },
  '&:focus, &:active, &:focus-within': {
    outline: 'none',
    backgroundColor: `$bg-active`,
    borderColor: '$border-highlight',
  },

  '&:disabled': { opacity: 0.65, pointerEvents: 'none' },
  '&[data-state="checked"]': { borderColor: '$border-highlight' },

  variants: {
    state: {
      initial: {},
      invalid: {
        backgroundColor: '$error-bg-hover',
        borderColor: '$error-bg-solid !important',
      },
    },
  },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
});

const Label = styled('label', {
  font: '$body-default',
  color: '$text-default',
  userSelect: 'none',
  paddingLeft: '$2',
});

type StyledCheckboxProps = ComponentProps<typeof StyledCheckbox>;

type CheckboxProps = {
  /**
   * The label that will be shown next to the checkbox.
   */
  children?: ReactNode;
  /**
   * Control whether the element is rendered as valid or invalid.
   */
  state?: StyledCheckboxProps['state'];
  /**
   * The checked state of the checkbox when it is initially rendered. Use when you do not need to control its checked state.
   */
  defaultChecked?: StyledCheckboxProps['defaultChecked'];
  /**
   * The controlled checked state of the checkbox. Must be used in conjunction with `onCheckedChange`.
   */
  checked?: StyledCheckboxProps['checked'];
  /**
   * Event handler called when the checked state of the checkbox changes.
   */
  onCheckedChange?: StyledCheckboxProps['onCheckedChange'];
  /**
   * When `true`, prevents the user from interacting with the checkbox.
   */
  disabled?: StyledCheckboxProps['disabled'];
  /**
   * When `true`, indicates that the user must check the checkbox before the owning form can be submitted.
   */
  required?: StyledCheckboxProps['required'];
  /**
   * The name of the checkbox. Submitted with its owning form as part of a name/value pair.
   */
  name?: StyledCheckboxProps['name'];
  /**
   * The value given as data when submitted with a `name`.
   */
  value?: StyledCheckboxProps['value'];
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
} & StyledCheckboxProps;

export const Checkbox = forwardRef<React.ElementRef<typeof StyledCheckbox>, CheckboxProps>(function Checkbox(
  { children, state = 'initial', required = false, disabled = false, ...props },
  ref,
) {
  const generatedId = useId();
  const id = props.id || generatedId;

  const checkbox = (
    <StyledCheckbox id={id} state={state} disabled={disabled} required={required} {...props} ref={ref}>
      <StyledIndicator>
        <CheckIcon />
      </StyledIndicator>
    </StyledCheckbox>
  );

  if (!children) {
    return checkbox;
  }

  return (
    <Flex gap={2}>
      {checkbox}
      <Flex gap={1}>
        <Label htmlFor={id}>{children}</Label>
        {required ? <RequiredBadge /> : null}
      </Flex>
    </Flex>
  );
});
