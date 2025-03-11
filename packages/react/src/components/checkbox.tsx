import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { ComponentProps, CSS, styled } from '../lib/stitches.js';
import { Flex } from './flex.js';
import { RequiredBadge } from './required-badge.js';

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
    size: {
      xs: {
        width: '$3',
        height: '$3',
      },
      sm: {
        width: '$4',
        height: '$4',
      },
      md: {
        width: '$6',
        height: '$6',
      },
    },
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

const Label = styled('div', {
  font: '$body-default',
  color: '$text-default',
  userSelect: 'none',

  variants: {
    size: {
      xs: {
        fontSize: '$3xs',
      },
      sm: {
        fontSize: '$xs',
      },
      md: {
        fontSize: '$md',
      },
    },

    noWrap: {
      true: {
        whiteSpace: 'nowrap',
      },
    },
  },
});

const Container = styled('label', {
  display: 'flex',
  gap: '$2',
  alignItems: 'center',

  variants: {
    size: {
      xs: {},
      sm: {},
      md: {},
    },
    variant: {
      button: {
        display: 'inline-flex',
        borderRadius: '$base',

        '& > div:first-child': {
          display: 'flex',
        },

        '&:hover, &:hover label': {
          cursor: 'pointer',
          backgroundColor: '$bg-hover',
        },
      },
      checkbox: {},
    },
  },
  compoundVariants: [
    {
      size: 'xs',
      variant: 'button',
      css: {
        gap: '$1',
        '& > div:first-child': {
          padding: '$1',
        },
        '& label': {
          paddingRight: '$1',
        },
      },
    },
    {
      size: 'sm',
      variant: 'button',
      css: {
        gap: '$1',
        '& > div:first-child': {
          padding: '$2',
        },
        '& label': {
          paddingRight: '$2',
        },
      },
    },
    {
      size: 'md',
      variant: 'button',
      css: {
        gap: '$2',
        '& > div:first-child': {
          padding: '$2',
        },
        '& label': {
          paddingRight: '$2',
        },
      },
    },
  ],
});

type StyledCheckboxProps = ComponentProps<typeof StyledCheckbox>;

type CheckboxProps = {
  /**
   * The label that will be shown next to the checkbox.
   */
  children?: React.ReactNode;
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

  size?: 'sm' | 'md';
  variant?: 'button' | 'checkbox';
  /**
   * When `true`, the label will not wrap to the next line.
   */
  noWrap?: boolean;
  /**
   * Triggered when the mouse enters the checkboxes surrounding label element
   * @param event
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLLabelElement>) => void;
  /**
   * Triggered when the mouse leaves the checkboxes surrounding label element.
   * @param event
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLLabelElement>) => void;
  /**
   * Triggered when clicking the label, but not the checkbox itself.
   * @param event
   */
  onClickLabel?: (event: React.MouseEvent<HTMLElement>) => void;
} & Omit<StyledCheckboxProps, 'onMouseEnter' | 'onMouseLeave'>;

export const Checkbox = React.forwardRef<React.ElementRef<typeof StyledCheckbox>, CheckboxProps>(function Checkbox(
  {
    children,
    state = 'initial',
    required = false,
    disabled = false,
    size = 'md',
    variant = 'checkbox',
    noWrap = false,
    onMouseEnter,
    onMouseLeave,
    onClickLabel,
    ...props
  },
  ref,
) {
  const checkbox = (
    <StyledCheckbox state={state} disabled={disabled} required={required} size={size} {...props} ref={ref}>
      <StyledIndicator>
        <CheckIcon />
      </StyledIndicator>
    </StyledCheckbox>
  );

  if (!children) {
    return checkbox;
  }

  return (
    <Container as="label" variant={variant} size={size} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div>{checkbox}</div>
      <Flex gap={1}>
        <Label as="div" size={size} noWrap={noWrap} onClick={onClickLabel}>
          {children}
        </Label>
        {required ? <RequiredBadge /> : null}
      </Flex>
    </Container>
  );
});
