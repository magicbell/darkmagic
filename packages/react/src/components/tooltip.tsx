import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { ElementRef, forwardRef } from 'react';

import { ComponentProps, keyframes, styled } from '../lib/stitches';

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
const StyledContent = styled(TooltipPrimitive.Content, {
  borderRadius: '$base',
  padding: 'calc($1/2) $4',
  font: '$body-small',
  color: '$text-default',
  backgroundColor: '$primary-bg',
  userSelect: 'none',

  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const StyledArrow = styled(TooltipPrimitive.Arrow, {
  fill: '$primary-bg',
});

type TooltipPrimitiveRootProps = ComponentProps<typeof TooltipPrimitive.Root>;
type TooltipPrimitiveTriggerProps = ComponentProps<typeof TooltipPrimitive.Trigger>;

type TooltipProps = {
  /**
   * The content to display in the tooltip.
   */
  content: StyledContentProps['children'];
  /**
   * The element to use as the trigger.
   */
  children: TooltipPrimitiveTriggerProps['children'];
  /**
   * When true, the `children` are returned without any wrapping element or
   * tooltip functionality. Use to conditionally render a tooltip.
   */
  enabled?: boolean;
  /**
   * The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: TooltipPrimitiveRootProps['defaultOpen'];
  /**
   * The controlled open state of the tooltip. Must be used in conjunction with `onOpenChange`.
   */
  open?: TooltipPrimitiveRootProps['open'];
  /**
   * Event handler called when the open state of the tooltip changes.
   */
  onOpenChange?: TooltipPrimitiveRootProps['onOpenChange'];
  /**
   * Override the duration given to the `Provider` to customise the open delay for a specific tooltip.
   */
  delayDuration?: TooltipPrimitiveRootProps['delayDuration'];
  /**
   * Prevents `Tooltip.Content` from remaining open when hovering. Disabling this has accessibility consequences. Inherits from `Tooltip.Provider`.
   */
  disableHoverableContent?: TooltipPrimitiveRootProps['disableHoverableContent'];

  /**
   * By default, screenreaders will announce the content inside the component. If this is not descriptive enough, or you have content that cannot be announced, use `aria-label` as a more descriptive label.
   */
  'aria-label'?: StyledContentProps['aria-label'];
  /**
   * Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`.
   */
  onEscapeKeyDown?: StyledContentProps['onEscapeKeyDown'];
  /**
   * Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`.
   */
  onPointerDownOutside?: StyledContentProps['onPointerDownOutside'];
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur and `avoidCollisions` is enabled.
   */
  side?: StyledContentProps['side'];
  /**
   * The distance in pixels from the trigger.
   */
  sideOffset?: StyledContentProps['sideOffset'];
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   */
  align?: StyledContentProps['align'];
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   */
  alignOffset?: StyledContentProps['alignOffset'];
  /**
   * When true, overrides the side andalign preferences to prevent collisions with boundary edges.
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
   * The padding between the arrow and the edges of the content. If your content has `border-radius`, this will prevent it from overflowing the corners.
   */
  arrowPadding?: StyledContentProps['arrowPadding'];
  /**
   * The sticky behavior on the align axis. `"partial"` will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst `"always"` will keep the content in the boundary regardless.
   */
  sticky?: StyledContentProps['sticky'];
  /**
   * Whether to hide the content when the trigger becomes fully occluded.
   */
  hideWhenDetached?: StyledContentProps['hideWhenDetached'];
};

const Root = forwardRef<ElementRef<typeof StyledContent>, TooltipProps>(function Tooltip(
  {
    // root
    defaultOpen,
    open,
    onOpenChange,
    delayDuration,
    disableHoverableContent,

    // custom
    children,
    content,
    enabled,

    // content
    sideOffset = 8,
    ...props
  },
  ref,
) {
  if (enabled === false) return children as any;

  return (
    <TooltipPrimitive.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <StyledContent sideOffset={sideOffset} {...props} ref={ref}>
          {content}
          <StyledArrow width={6} height={7} />
        </StyledContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});

export const Tooltip = Object.assign(Root, {
  Provider: TooltipPrimitive.Provider,
});
