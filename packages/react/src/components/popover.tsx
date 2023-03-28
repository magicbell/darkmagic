import { Cross2Icon } from '@radix-ui/react-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import React, { ElementRef, forwardRef } from 'react';

import { ComponentProps, CSS, keyframes, styled } from '../lib/stitches';
import { IconButton } from './icon-button';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

type StyledContentProps = ComponentProps<typeof StyledContent>;
const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: '$base',
  backgroundColor: '$bg-app-2',
  boxShadow: 'rgb(0 0 0 / 20%) 0px 4px 24px',
  border: '1px solid $border-muted',
  padding: '$3 $4',
  display: 'flex',
  flexDirection: 'column',

  '&:focus': { outline: 'none' },

  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },

  variants: {
    width: {
      xs: { width: '$2xs', borderRadius: '$sm' },
      sm: { width: '$xs', borderRadius: '$md' },
      md: { width: '$sm', borderRadius: '$md' },
      lg: { width: '$lg', borderRadius: '$lg' },
    },
    padding: {
      none: { padding: '0' },
      sm: { padding: '$sm' },
      md: { padding: '$md' },
      lg: { padding: '$lg' },
      xl: { padding: '$xl' },
    },
  },
});

const StyledClose = styled(PopoverPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

const Title = styled('div', {
  font: '$heading-md',
  paddingRight: '$6',
});

const Body = styled('div');

type PopoverPrimitiveTriggerProps = ComponentProps<typeof PopoverPrimitive.Trigger>;
type TriggerProps = {
  children: PopoverPrimitiveTriggerProps['children'];
};

const Trigger = forwardRef<ElementRef<typeof PopoverPrimitive.Trigger>, TriggerProps>(function Trigger(
  { children, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Trigger asChild {...props} ref={ref}>
      {children}
    </PopoverPrimitive.Trigger>
  );
});

type ContentProps = {
  /**
   * The width of the popover. Defaults to `md`.
   */
  width?: StyledContentProps['width'];
  /**
   * The padding of the popover. Defaults to `md`.
   */
  padding?: StyledContentProps['padding'];
  /**
   * Set to `false` to hide the close button.
   */
  showCloseButton?: boolean;
  /**
   * The content to render inside the popover. Usually a combination of `Popover.Title` and `Popover.Body`.
   */
  children?: StyledContentProps['children'];
  /**
   * Event handler called when focus moves into the component after opening. It can be prevented by calling `event.preventDefault`.
   */
  onOpenAutoFocus?: StyledContentProps['onOpenAutoFocus'];
  /**
   * Event handler called when focus moves to the trigger after closing. It can be prevented by calling `event.preventDefault`.
   */
  onCloseAutoFocus?: StyledContentProps['onCloseAutoFocus'];
  /**
   * Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`.
   */
  onEscapeKeyDown?: StyledContentProps['onEscapeKeyDown'];
  /**
   * Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`.
   */
  onPointerDownOutside?: StyledContentProps['onPointerDownOutside'];
  /**
   * Event handler called when focus moves outside the bounds of the component. It can be prevented by calling `event.preventDefault`.
   */
  onFocusOutside?: StyledContentProps['onFocusOutside'];
  /**
   * Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component. It can be prevented by calling `event.preventDefault`.
   */
  onInteractOutside?: StyledContentProps['onInteractOutside'];
  /**
   * The preferred side of the anchor to render against when open. Will be reversed when collisions occur and `avoidCollisions` is enabled.
   */
  side?: StyledContentProps['side'];
  /**
   * The distance in pixels from the anchor.
   */
  sideOffset?: StyledContentProps['sideOffset'];
  /**
   * The preferred alignment against the anchor. May change when collisions occur.
   */
  align?: StyledContentProps['align'];
  /**
   * An offset in pixels from the `"start"` or `"end"` alignment options.
   */
  alignOffset?: StyledContentProps['alignOffset'];
  /**
   * When `true`, overrides the `side` and `align` preferences to prevent collisions with boundary edges.
   */
  avoidCollisions?: StyledContentProps['avoidCollisions'];
  /**
   * The element used as the collision boundary. By default this is the viewport, though you can provide additional element(s) to be included in this check.
   */
  collisionBoundary?: StyledContentProps['collisionBoundary'];
  /**
   * The distance in pixels from the boundary edges where collision detection should occur. Accepts a number (same for all sides), or a partial padding object, for example: `{ top: 20, left: 20 }`.
   */
  collisionPadding?: StyledContentProps['collisionPadding'];
  /**
   * The sticky behavior on the align axis. `"partial"` will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst `"always"` will keep the content in the boundary regardless.
   */
  sticky?: StyledContentProps['sticky'];
  /**
   * Whether to hide the content when the trigger becomes fully occluded.
   */
  hideWhenDetached?: StyledContentProps['hideWhenDetached'];
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
};

const Content = forwardRef<ElementRef<typeof StyledContent>, ContentProps>(function Content(
  { children, width = 'md', padding = 'md', showCloseButton = true, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Portal>
      <StyledContent width={width} padding={padding} {...props} ref={ref}>
        {children}

        {showCloseButton && (
          <StyledClose asChild>
            <IconButton variant="ghost" size="xs" icon={Cross2Icon} label="Close popover" />
          </StyledClose>
        )}
      </StyledContent>
    </PopoverPrimitive.Portal>
  );
});

type PopoverPrimitiveRootProps = ComponentProps<typeof PopoverPrimitive.Root>;
type PopoverProps = {
  /**
   * The open state of the popover when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: PopoverPrimitiveRootProps['defaultOpen'];

  /**
   * The controlled open state of the popover. Must be used in conjunction with `onOpenChange`.
   */
  open?: PopoverPrimitiveRootProps['open'];

  /**
   * Event handler called when the open state of the popover changes.
   */
  onOpenChange?: PopoverPrimitiveRootProps['onOpenChange'];

  /**
   * The modality of the popover. When set to `true`, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
   */
  modal?: PopoverPrimitiveRootProps['modal'];

  /**
   * The Root children, usually a combination of the `Popover.Trigger` which would wrap a button, and the `Popover.Content` which would contain the popover content.
   */
  children?: PopoverPrimitiveRootProps['children'];
};

const Root = function Popover({ children, ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
};

export const Popover = Object.assign(Root, {
  Trigger,
  Title,
  Content,
  Body,
});
