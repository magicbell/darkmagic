import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Slot, Slottable } from '@radix-ui/react-slot';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';

import { useMousetrap } from '../hooks/use-mousetrap';
import { makeComponent } from '../lib/component';
import { ComponentProps, CSS, styled } from '../lib/stitches';
import { Spinner } from './spinner';
import { Tooltip } from './tooltip';

const StyledButton = styled('button', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  // Custom reset
  display: 'inline-grid',
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
  cursor: 'pointer',

  '&:focus': { outline: 'none' },
  // use a data attribute for compatibility with as="a"
  '&[data-disabled]': { opacity: 0.65, pointerEvents: 'none' },
  transition: 'background-color .2s ease, color .2s ease, opacity .2s ease',

  '& > *': {
    transition: 'opacity .2s ease',
  },

  '&[data-state]:not([data-state="idle"]) > *:not([data-state])': {
    opacity: 0,
  },

  '&[data-state="success"]': {
    backgroundColor: '$success-bg-solid',
    color: '$text-default',

    '&:hover, &:focus-visible': {
      backgroundColor: '$success-bg-solid-hover',
    },

    '&:active': {
      backgroundColor: '$success-bg-solid',
    },
  },

  '&[data-state="error"]': {
    backgroundColor: '$error-bg-solid',
    color: '$text-default',

    '&:hover, &:focus-visible': {
      backgroundColor: '$error-bg-solid-hover',
    },

    '&:active': {
      backgroundColor: '$error-bg-solid',
    },
  },

  variants: {
    size: {
      sm: { height: '$8', padding: '0 $3', font: '$caption' },
      md: { height: '$10', padding: '0 $4', font: '$body-small-bold' },
      lg: { height: '$12', padding: '0 $4', font: '$body-default' },
    },

    width: {
      auto: { width: 'auto' },
      sm: { width: '$20' },
      md: { width: '$30' },
      lg: { width: '$40' },
      full: { width: '100%' },
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
    icons: {
      leading: {
        gridTemplateColumns: 'auto auto',
        '& > *:nth-child(1)': { gridRow: 1, gridColumn: 1 },
        '& > *:nth-child(2)': { gridRow: 1, gridColumn: 2 },
      },
      trailing: {
        gridTemplateColumns: 'auto auto',
        '& > *:nth-child(1)': { gridRow: 1, gridColumn: 1 },
        '& > *:nth-child(2)': { gridRow: 1, gridColumn: 2 },
      },
      both: {
        gridTemplateColumns: 'auto auto auto',
        '& > *:nth-child(1)': { gridRow: 1, gridColumn: 1 },
        '& > *:nth-child(2)': { gridRow: 1, gridColumn: 2 },
        '& > *:nth-child(3)': { gridRow: 1, gridColumn: 3 },
      },
      none: {
        gridTemplateColumns: 'auto',
        '& > *:nth-child(1)': { gridRow: 1, gridColumn: 1 },
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

const StyledContent = styled('span', {
  display: 'inline-block',

  variants: {
    truncate: {
      true: {
        truncate: true,
      },
    },
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
   * The width of the button
   */
  width?: StyledButtonProps['width'];

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
   * The value of the button. Submitted with its owning form as part of a name/value pair.
   */
  value?: StyledButtonProps['value'];
  /**
   * The type of button, this controls the action it takes when clicked in a form.
   */
  type?: StyledButtonProps['type'];
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
  /**
   * A tooltip to display when hovering the button. This will wrap the button in a `Tooltip` component.
   */
  tooltip?: string;
  /**
   * A keyboard shortcut to display next to the button. This will add a `kbd` tag to the Tooltip.
   */
  shortcut?: string;
  /**
   * Use state to control the button’s appearance. The error and success state will be reset to idle after the stateResetDelay.
   */
  state?: 'idle' | 'loading' | 'error' | 'success';
  /**
   * The duration in ms to keep the success or error state before resetting to idle.
   */
  stateResetDelay?: number;

  disabled?: StyledButtonProps['disabled'];
  asChild?: boolean;
};

const StyledLoader = styled('div', {
  gridArea: '1 / 1 / -1 / -1',
  justifySelf: 'center',
  opacity: 1,

  '&[data-state="idle"]': {
    opacity: 0,
  },
});

function State({ state }: { state: 'idle' | 'loading' | 'error' | 'success' }) {
  return (
    <StyledLoader aria-hidden={true} data-state={state}>
      {state === 'loading' ? (
        <Spinner />
      ) : state === 'success' ? (
        <CheckIcon />
      ) : state === 'error' ? (
        <ExclamationTriangleIcon />
      ) : null}
    </StyledLoader>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    leadingIcon,
    trailingIcon,
    children,
    size = 'md',
    variant = 'primary',
    type = 'button',
    asChild,
    state,
    stateResetDelay = 1500,
    tooltip,
    shortcut,
    ...props
  },
  forwardedRef,
) {
  const LeadingIcon = makeComponent(leadingIcon);
  const TrailingIcon = makeComponent(trailingIcon);
  const Comp = asChild ? Slot : 'button';

  const ref = React.useRef<HTMLButtonElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  useMousetrap(shortcut, (e) => {
    if (props.disabled || !ref.current) return;
    e.preventDefault();
    ref.current.click();
  });

  if (asChild && state != null) {
    throw new Error('You cannot use `state` and `asChild` together');
  }

  const [derivedState, setDerivedState] = useState<ButtonProps['state']>(state || 'idle');
  useEffect(() => {
    setDerivedState(state);

    if (state !== 'success' && state !== 'error') return;
    const timeout = setTimeout(() => setDerivedState('idle'), stateResetDelay);
    return () => clearTimeout(timeout);
  }, [state, stateResetDelay]);

  const button = (
    <StyledButton
      as={Comp}
      data-disabled={props.disabled || undefined}
      type={type}
      variant={variant}
      size={size}
      {...props}
      ref={composedRefs}
      icons={LeadingIcon && TrailingIcon ? 'both' : LeadingIcon ? 'leading' : TrailingIcon ? 'trailing' : 'none'}
      data-state={derivedState}
    >
      {LeadingIcon && (
        <IconWrapper>
          <LeadingIcon />
        </IconWrapper>
      )}

      {asChild ? (
        <Slottable>{children}</Slottable>
      ) : (
        <StyledContent truncate={Boolean(props.width)}>{children}</StyledContent>
      )}

      {TrailingIcon && (
        <IconWrapper>
          <TrailingIcon />
        </IconWrapper>
      )}

      {derivedState && <State state={derivedState} />}
    </StyledButton>
  );

  if (!tooltip && !shortcut) return button;

  return (
    <Tooltip content={tooltip} shortcut={shortcut}>
      {button}
    </Tooltip>
  );
});
