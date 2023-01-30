import { blackA } from '@radix-ui/colors';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useId } from '@radix-ui/react-id';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import React, { forwardRef, ReactNode } from 'react';

import { useFormReset } from '../hooks/use-form-reset';
import { useMaybeControlled } from '../hooks/use-maybe-controlled';
import { ComponentProps, CSS, styled } from '../lib/stitches';
import { Flex } from './flex';
import { IconButton } from './icon-button';
import { RequiredBadge } from './required-badge';

const Label = styled('label', {
  font: '$body-default',
  color: '$text-default',
  userSelect: 'none',
  paddingLeft: '$2',
});

type StyledSwitchProps = ComponentProps<typeof StyledSwitch>;

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  flex: 'none',
  width: '$10',
  height: '$6',
  backgroundColor: '$bg-active',
  borderRadius: '9999px',
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  transition: 'background-color .1s linear',
  '&:focus': { outline: 'none' },

  '&[data-state="unchecked"]:hover, &[data-state="unchecked"]:focus-visible': { backgroundColor: '$border-muted' },
  '&[data-state="checked"]:hover, &[data-state="checked"]:focus-visible': { backgroundColor: '$primary-bg-hover' },
  '&[data-state="checked"]': { backgroundColor: '$primary-bg' },
  '&:disabled': { opacity: 0.65, pointerEvents: 'none' },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: `0 2px 2px ${blackA.blackA7}`,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

type SwitchProps = {
  /**
   * The label that will be shown next to the checkbox.
   */
  children?: ReactNode;
  /**
   * On which side of the switch the label should be shown.
   */
  labelPosition?: 'leading' | 'trailing';
  /**
   * The checked state of the switch when it is initially rendered. Use when you do not need to control its checked state.
   */
  defaultChecked?: StyledSwitchProps['defaultChecked'];
  /**
   * The controlled checked state of the switch. Must be used in conjunction with `onCheckedChange`.
   */
  checked?: StyledSwitchProps['checked'];
  /**
   * Event handler called when the checked state of the switch changes.
   */
  onCheckedChange?: StyledSwitchProps['onCheckedChange'];
  /**
   * When `true`, prevents the user from interacting with the switch.
   */
  disabled?: StyledSwitchProps['disabled'];
  /**
   * When `true`, indicates that the user must check the switch before the owning form can be submitted.
   */
  required?: StyledSwitchProps['required'];
  /**
   * The name of the switch. Submitted with its owning form as part of a name/value pair.
   */
  name?: StyledSwitchProps['name'];
  /**
   * The value given as data when submitted with a `name`.
   */
  value?: StyledSwitchProps['value'];
  /**
   * Show a tooltip in the form of a question mark icon next to the label.
   */
  tooltip?: string;
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
} & StyledSwitchProps;

export const Switch = forwardRef<React.ElementRef<typeof StyledSwitch>, SwitchProps>(function Switch(
  {
    children,
    required = false,
    disabled = false,
    labelPosition = 'trailing',
    tooltip,
    defaultChecked,
    checked: checkedFromProps,
    onCheckedChange,
    ...props
  },
  forwardedRef,
) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  const [checked, handleCheckedChange, reset] = useMaybeControlled<boolean>(
    defaultChecked,
    checkedFromProps,
    onCheckedChange,
  );
  useFormReset(reset, ref.current);

  const generatedId = useId();
  const id = props.id || generatedId;

  const control = (
    <StyledSwitch
      id={id}
      disabled={disabled}
      required={required}
      {...props}
      checked={checked}
      onCheckedChange={handleCheckedChange}
      ref={composedRefs}
    >
      <StyledThumb />
    </StyledSwitch>
  );

  if (!children) {
    return control;
  }

  return (
    <Flex gap={2}>
      {labelPosition === 'trailing' ? control : null}
      <Flex gap={1}>
        <Label htmlFor={id}>{children}</Label>
        {required ? <RequiredBadge /> : null}
        {tooltip ? <IconButton label="show tooltip" variant="inline" icon={QuestionMarkCircledIcon} /> : null}
      </Flex>
      {labelPosition === 'leading' ? control : null}
    </Flex>
  );
});
