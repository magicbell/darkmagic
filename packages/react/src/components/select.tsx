import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import React, { ComponentProps, ElementRef, forwardRef, ReactNode } from 'react';

import { CSS, styled, VariantProps } from '../lib/stitches';

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '$base',
  padding: '0 calc($2 - 1px)',
  font: '$body-default',
  width: '100%',
  backgroundColor: '$bg-default',
  color: '$text-default',
  border: '1px solid transparent',

  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  '&:hover': { backgroundColor: '$bg-hover' },
  '&:focus, &:active': { backgroundColor: `$bg-active` },
  '&[data-placeholder]': { color: '$text-muted' },

  // disabled
  '&[data-disabled]': { opacity: 0.65, pointerEvents: 'none' },

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

const StyledSelectValue = styled('span', {
  padding: '0 $1',
  width: '100%',
  userSelect: 'none',
});

const StyledIcon = styled(SelectPrimitive.SelectIcon, {
  padding: '0 $1',
  color: '$text-muted',
  flex: 'none',
});

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  borderRadius: '$base',
  padding: '$2',
  border: '1px solid $border-highlight',
  backgroundColor: '$bg-default',
});

const StyledItem = styled(SelectPrimitive.Item, {
  all: 'unset',
  font: '$body-small',
  color: '$text-default',
  borderRadius: '$base',
  display: 'flex',
  alignItems: 'center',
  padding: '$2 $1 $2 $7',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    pointerEvents: 'none',
    opacity: 0.65,
  },

  '&[data-highlighted]': {
    backgroundColor: '$bg-active',
  },
});

const StyledItemText = styled('span', {
  padding: '0 $1',
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: '$6',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
});

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '$6',
  color: '$text-muted',
  cursor: 'default',

  '&:hover': {
    color: '$text-default',
  },
};

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles);

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles);

type TriggerProps = ComponentProps<typeof SelectPrimitive.SelectTrigger>;
type SelectPrimitiveProps = ComponentProps<typeof SelectPrimitive.Root>;
type SelectVariants = VariantProps<typeof StyledTrigger>;

type SelectProps = {
  /**
   * The height of the select element.
   */
  size?: SelectVariants['size'];
  /**
   * Control whether the element is rendered as valid or invalid.
   */
  state?: SelectVariants['state'];
  /**
   * The content that will be rendered inside the `Select.Value` when no `value` or `defaultValue` is set.
   */
  placeholder?: string;
  /**
   * When `true`, prevents the user from interacting with the item.
   */
  disabled?: TriggerProps['disabled'];
  /**
   * The value of the select when initially rendered. Use when you do not need to control the state of the select.
   */
  defaultValue?: SelectPrimitiveProps['defaultValue'];
  /**
   * The controlled value of the select. Should be used in conjunction with `onValueChange`.
   */
  value?: SelectPrimitiveProps['value'];
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: SelectPrimitiveProps['onValueChange'];
  /**
   * The open state of the select when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: SelectPrimitiveProps['defaultOpen'];
  /**
   * The controlled open state of the select. Must be used in conjunction with `onOpenChange`.
   */
  open?: SelectPrimitiveProps['open'];
  /**
   * Event handler called when the open state of the select changes.
   */
  onOpenChange?: SelectPrimitiveProps['onOpenChange'];
  /**
   * The reading direction of the select when applicable. If omitted, inherits globally from `DirectionProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: SelectPrimitiveProps['dir'];
  /**
   * The name of the select. Submitted with its owning form as part of a name/value pair.
   */
  name?: SelectPrimitiveProps['name'];
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
} & SelectPrimitive.SelectProps &
  TriggerProps;

const Root = forwardRef<ElementRef<typeof StyledTrigger>, SelectProps>(function Select(
  {
    // Root
    value,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    dir,
    name,
    autoComplete,
    // SelectValue
    placeholder,
    // Content
    children,
    // Trigger
    size = 'md',
    state = 'initial',
    disabled = false,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.Root
      name={name}
      dir={dir}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      autoComplete={autoComplete}
    >
      <StyledTrigger
        aria-invalid={Boolean(props['aria-errormessage']) || props['aria-invalid']}
        disabled={disabled}
        {...props}
        size={size}
        state={state}
        ref={ref}
      >
        <StyledSelectValue>
          <SelectPrimitive.SelectValue placeholder={placeholder} />
        </StyledSelectValue>
        <StyledIcon>
          <ChevronDownIcon />
        </StyledIcon>
      </StyledTrigger>
      <SelectPrimitive.Portal>
        <StyledContent>
          <StyledScrollUpButton>
            <ChevronUpIcon />
          </StyledScrollUpButton>
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          <StyledScrollDownButton>
            <ChevronDownIcon />
          </StyledScrollDownButton>
        </StyledContent>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

type SelectGroupProps = {
  label: string;
} & ComponentProps<typeof SelectPrimitive.Group>;

const Group = forwardRef<ElementRef<typeof SelectPrimitive.Group>, SelectGroupProps>(function SelectGroup(
  { children, label, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Group {...props} ref={ref}>
      <SelectPrimitive.Label>{label}</SelectPrimitive.Label>
      {children}
    </SelectPrimitive.Group>
  );
});

type SelectItemPrimitiveProps = SelectPrimitive.SelectItemProps;

type SelectItemProps = {
  /**
   * The value given as data when submitted with a `name`.
   */
  value: SelectItemPrimitiveProps['value'];
  /**
   * When `true`, prevents the user from interacting with the item.
   */
  disabled?: SelectItemPrimitiveProps['disabled'];
  /**
   * Optional text used for typeahead purposes. By default the typeahead behavior will use the .textContent of the Select.ItemText part. Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: SelectItemPrimitiveProps['textValue'];
  /**
   * The text or complex content to show in the select option.
   */
  children: ReactNode;
};

const Item = forwardRef<ElementRef<typeof StyledItem>, SelectItemProps>(function Item({ children, ...props }, ref) {
  return (
    <StyledItem {...props} ref={ref}>
      <StyledItemText>
        {typeof children === 'string' ? <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText> : children}
      </StyledItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  );
});

export const Select = Object.assign(Root, {
  Group,
  Item,
});
