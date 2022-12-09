import { useId } from '@radix-ui/react-id';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import React, { ElementRef, forwardRef } from 'react';

import { ComponentProps, CSS, styled } from '../lib/stitches';

const StyledRadio = styled('div', {
  display: 'flex',
  gap: '$2',
});

const StyledItem = styled(RadioGroupPrimitive.Item, {
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
  borderRadius: '100%',

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

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '$text-default',
  },
});

const StyledRadioGroup = styled(RadioGroupPrimitive.Root, {
  display: 'flex',
  gap: '$3',

  '&[data-orientation="horizontal"]': {},

  variants: {
    orientation: {
      vertical: { flexDirection: 'column' },
      horizontal: { flexDirection: 'row', gap: '$4' },
    },
    spacing: {
      xs: { gap: '$2' },
      sm: { gap: '$3' },
      md: { gap: '$4' },
    },
  },
});

type StyledRadioGroupProps = ComponentProps<typeof StyledRadioGroup>;

const Label = styled('label', {
  font: '$body-default',
  color: '$text-default',
  userSelect: 'none',

  variants: {
    disabled: {
      true: {
        pointerEvents: 'none',
      },
    },
  },
});

type RadioGroupProps = {
  /**
   * The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items.
   */
  defaultValue?: StyledRadioGroupProps['defaultValue'];
  /**
   * The controlled value of the radio item to check. Should be used in conjunction with onValueChange.
   */
  value?: StyledRadioGroupProps['value'];
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: StyledRadioGroupProps['onValueChange'];
  /**
   * The name of the group. Submitted with its owning form as part of a name/value pair.
   */
  name?: StyledRadioGroupProps['name'];
  /**
   * When true, indicates that the user must check a radio item before the owning form can be submitted.
   */
  required?: StyledRadioGroupProps['required'];
  /**
   * The reading direction of the radio group. If omitted, inherits globally from DirectionProvider or assumes LTR (left-to-right) reading mode.
   */
  dir?: StyledRadioGroupProps['dir'];
  /**
   * When true, keyboard navigation will loop from last item to first, and vice versa.
   */
  loop?: StyledRadioGroupProps['loop'];
  /**
   * The orientation of the component.
   */
  orientation?: StyledRadioGroupProps['orientation'];
  /**
   * The space between radios.
   */
  spacing?: StyledRadioGroupProps['spacing'];
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
} & StyledRadioGroupProps;

const Root = forwardRef<ElementRef<typeof StyledRadioGroup>, RadioGroupProps>(function RadioGroup(
  { orientation = 'vertical', spacing = 'md', ...props },
  ref,
) {
  return <StyledRadioGroup orientation={orientation} spacing={spacing} {...props} ref={ref} />;
});

type StyledItemProps = ComponentProps<typeof StyledItem>;

type ItemProps = {
  /**
   * The value given as data when submitted with a `name`.
   */
  value: StyledItemProps['value'];
  /**
   * When `true`, prevents the user from interacting with the radio item.
   */
  disabled?: StyledItemProps['disabled'];
  /**
   * When `true`, indicates that the user must check the radio item before the owning form can be submitted.
   */
  required?: StyledItemProps['required'];
  /**
   * The state of the radio item.
   */
  state?: StyledItemProps['state'];
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;

  /**
   * The radio label
   */
  children: string;
} & StyledItemProps;

const Item = forwardRef<ElementRef<typeof StyledItem>, ItemProps>(function Item(
  { children, disabled = false, ...props },
  forwardedRef,
) {
  const generatedId = useId();
  const id = props.id || generatedId;

  return (
    <StyledRadio>
      <StyledItem disabled={disabled} {...props} id={id} ref={forwardedRef}>
        <StyledIndicator />
      </StyledItem>
      <Label htmlFor={id} disabled={disabled}>
        {children}
      </Label>
    </StyledRadio>
  );
});

export const RadioGroup = Object.assign(Root, {
  Item,
});
