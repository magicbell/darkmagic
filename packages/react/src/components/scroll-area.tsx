import { blackA } from '@radix-ui/colors';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import React, { ElementRef, forwardRef, ReactNode } from 'react';

import { ComponentProps, styled } from '../lib/stitches';

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: '100%',
  height: '100%',
  borderRadius: 0,
  overflow: 'hidden',
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: 2,
  background: 'unset',
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '$text-muted',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  background: 'unset',
});

type ScrollAreaProps = {
  children: ReactNode;
  direction?: 'horizontal' | 'vertical' | 'both' | 'none';
} & ComponentProps<typeof StyledViewport>;

export const ScrollArea = forwardRef<ElementRef<typeof StyledScrollArea>, ScrollAreaProps>(function ScrollArea(
  { children, direction = 'both', ...props },
  ref,
) {
  return (
    <StyledScrollArea ref={ref}>
      <StyledViewport {...props}>{children}</StyledViewport>

      {['vertical', 'both'].includes(direction) && (
        <StyledScrollbar orientation="vertical">
          <StyledThumb />
        </StyledScrollbar>
      )}

      {['horizontal', 'both'].includes(direction) && (
        <StyledScrollbar orientation="horizontal">
          <StyledThumb />
        </StyledScrollbar>
      )}
      <StyledCorner />
    </StyledScrollArea>
  );
});
