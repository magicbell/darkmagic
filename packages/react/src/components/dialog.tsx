import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import invariant from 'tiny-invariant';

import { transformChildren } from '../lib/component.js';
import { getSlots } from '../lib/slots.js';
import { ComponentProps, keyframes, styled } from '../lib/stitches.js';
import { IconButton } from './icon-button.js';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -4px) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, 0) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$bg-overlay',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  zIndex: 1,
});

const StyledHeader = styled('div', {
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  padding: '$6 $4xl $3 $8',
});

const StyledBody = styled('div', {
  padding: '0 $8 $6 $8',
});

type StyledContentProps = ComponentProps<typeof StyledContent>;
const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$bg-app-2',
  boxShadow: 'rgb(0 0 0 / 20%) 0px 4px 24px',
  borderRadius: '$lg',
  position: 'fixed',
  top: 'min(15vh, $sizes$44)',
  left: '50%',
  transform: 'translate(-50%, 0)',
  border: '1px solid $border-muted',
  maxWidth: '90vw',
  maxHeight: '85vh',
  zIndex: 1,

  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },

  variants: {
    width: {
      sm: { width: '$lg' },
      md: { width: '$2xl' },
      lg: { width: '$4xl' },
      full: { width: '$full' },
    },
  },
});

const StyledClose = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$4',
  right: '$4',
});

const StyledTitle = styled(DialogPrimitive.Title, {
  color: '$text-default',
  font: '$heading-md',
  width: '100%',
});

const StyledDescription = styled(DialogPrimitive.Description, {
  color: '$text-muted',
  font: '$body-small',
  padding: '$1 0 $2 0',
});

type TriggerProps = {
  children: ComponentProps<typeof DialogPrimitive.Trigger>['children'];
};

const Trigger = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Trigger>, TriggerProps>(function Trigger(
  { children, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Trigger asChild {...props} ref={ref}>
      {children}
    </DialogPrimitive.Trigger>
  );
});

type ContentProps = {
  /**
   * The width of the dialog. Defaults to `sm`.
   */
  width?: StyledContentProps['width'];

  /**
   * Set to `false` to hide the close button.
   */
  showCloseButton?: boolean;

  /**
   * Event handler called when focus moves into the component after opening. It
   * can be prevented by calling `event.preventDefault.`
   */
  onOpenAutoFocus?: StyledContentProps['onOpenAutoFocus'];

  /**
   * Event handler called when focus moves to the trigger after closing. It can
   * be prevented by calling `event.preventDefault`.
   */
  onCloseAutoFocus?: StyledContentProps['onCloseAutoFocus'];

  /**
   * Event handler called when the escape key is down. It can be prevented by
   * calling `event.preventDefault`.
   */
  onEscapeKeyDown?: StyledContentProps['onEscapeKeyDown'];

  /**
   * Event handler called when a pointer event occurs outside the bounds of the
   * component. It can be prevented by calling `event.preventDefault`.
   */
  onPointerDownOutside?: StyledContentProps['onPointerDownOutside'];

  /**
   * Event handler called when an interaction (pointer or focus event) happens
   * outside the bounds of the component. It can be prevented by calling `event.preventDefault`.
   */
  onInteractOutside?: StyledContentProps['onInteractOutside'];

  /**
   * The dialog contents. Usually a combination of `Dialog.Title`, `Dialog.Description` and `Dialog.Body`. Description
   * is optional. If no `Body` is provided, remaining `children` will be wrapped in one.
   */
  children: StyledContentProps['children'];
} & StyledContentProps;

const Content = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ContentProps>(function Content(
  { children, width = 'sm', showCloseButton = true, ...props },
  forwardedRef,
) {
  const slots = getSlots(children, {
    title: Dialog.Title,
    description: Dialog.Description,
  });

  invariant(slots.title, 'A dialog title is required. Please add a Dialog.Title component.');

  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent width={width} {...props} ref={forwardedRef}>
        <StyledHeader>
          {slots.title}
          {slots.description}
        </StyledHeader>

        {slots.children}

        {showCloseButton && (
          <StyledClose asChild>
            <IconButton variant="ghost" size="xs" icon={Cross2Icon} label="Close dialog" />
          </StyledClose>
        )}
      </StyledContent>
    </DialogPrimitive.Portal>
  );
});

type RootProps = ComponentProps<typeof DialogPrimitive.Root>;
type DialogProps = {
  /**
   * The open state of the dialog when it is initially rendered. Use when you do
   * not need to control its open state.
   */
  defaultOpen?: RootProps['defaultOpen'];
  /**
   * The controlled open state of the dialog. Must be used in conjunction with
   * `onOpenChange`.
   */
  open?: RootProps['open'];
  /**
   * Event handler called when the open state of the dialog changes.
   */
  onOpenChange?: RootProps['onOpenChange'];
  /**
   * The modality of the dialog. When set to `true`, interaction with outside
   * elements will be disabled and only dialog content will be visible to screen readers.
   */
  modal?: boolean;
  /**
   * When set to `false`, no close button will be shown and click away gets disabled.
   * Use this in combination with the `open` prop to control the dialog state, and
   * force the user to click one of your dialog action buttons.
   */
  dismissable?: boolean;
  /**
   * The contents, usually a button wrapped in `Dialog.Trigger` and a `Dialog.Content`
   * component.
   */
  children: React.ReactNode;
} & RootProps;

const Root = function Dialog({ children, dismissable = true, ...props }: DialogProps) {
  const onOpenChange: DialogProps['onOpenChange'] = (open) => {
    // ignore close attempts when `dismissable` is `false`
    if (!dismissable && open === false) return;
    return props.onOpenChange?.(open);
  };

  const modal = dismissable ? props.modal : true;

  return (
    <DialogPrimitive.Root {...props} onOpenChange={onOpenChange} modal={modal}>
      {transformChildren(children, (child) => {
        if (child.type === Content) return React.cloneElement(child, { showCloseButton: dismissable, ...child.props });
        return child;
      })}
    </DialogPrimitive.Root>
  );
};

export const Dialog = Object.assign(Root, {
  Trigger,
  Title: StyledTitle,
  Description: StyledDescription,
  Content,
  Body: StyledBody,
});
