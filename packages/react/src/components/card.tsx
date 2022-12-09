import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-ui/react-icons';
import { ElementRef, forwardRef, ReactNode, useMemo, useRef, useState } from 'react';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';

import { createSlot, getSlots } from '../lib/slots';
import { ComponentProps, keyframes, styled } from '../lib/stitches';
import { IconButton } from './icon-button';
import { Pane } from './pane';
import { ScrollArea } from './scroll-area';

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
    animation: `${overlayShow} 150ms linear`,
  },
});

const StyledDialogContent = styled(DialogPrimitive.Content, {
  position: 'fixed',
  top: '$6',
  left: '50%',
  transform: 'translate(-50%, 0)',

  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms linear`,
  },
  '&:focus': { outline: 'none' },
});

const StyledCardBody = styled('div', {
  display: 'flex',
  font: '$body-small',
  color: '$text-default',
  position: 'relative',

  width: '100%',
  flex: 'auto',
  minHeight: 0,

  '& > [data-radix-scroll-area-viewport], & > * > [data-radix-scroll-area-viewport]': {
    padding: '$4 $6',

    // If we run into scrollbar issues, it might be because of this. We need the
    // first div of the scroll-area to be a block instead of table, so the Code
    // component renders its own scrollbar instead of growing out of the parent.
    // Radix however mentions that the table is needed for scrollbar (thumb)
    // computations.
    //
    // See https://github.com/radix-ui/primitives/blob/e861c1/packages/react/scroll-area/src/ScrollArea.tsx#L176-L185
    '& > div': {
      display: 'block !important',
    },
  },
});

type StyledCardBodyProps = ComponentProps<typeof StyledCardBody>;

type BodyProps = {
  children?: ReactNode;
} & StyledCardBodyProps;

const Body = forwardRef<ElementRef<typeof StyledCardBody>, BodyProps>(function Body({ children, ...props }, ref) {
  return (
    <StyledCardBody {...props} ref={ref}>
      <ScrollArea direction="vertical">{children}</ScrollArea>
    </StyledCardBody>
  );
});

const StyledPlaceholderCard = styled('div', {
  borderRadius: '$lg',
  backgroundColor: '$bg-default',
  border: '1px solid $border-muted',
  width: '100%',
});

const StyledCard = styled(Pane.Root, {
  borderRadius: '$lg',
  backgroundColor: '$bg-app',
  border: '1px solid $border-muted',

  variants: {
    expanded: {
      true: {
        width: '90vw',
        minHeight: 'max($96, 40vh)',
        maxWidth: '$5xl',
        maxHeight: '85vh',
      },
    },
  },
});

type CardProps = {
  /**
   * The children to render inside the card. This can be a react node, or a
   * render function to get access to the cards expanded state.
   */
  children: ReactNode | ((options: { expanded: boolean }) => ReactNode);
  /**
   * When set to `true`, the card gets a "full screen" action button, which shows
   * the card in a modal on click. Defaults to `false`.
   */
  expandable?: boolean;
};

const Actions = createSlot('Actions');

const Root = forwardRef<ElementRef<typeof StyledCard>, CardProps>(function Card(
  { children, expandable = false, ...props },
  forwardedRef,
) {
  const [expanded, setExpanded] = useState(false);
  const portalNode = useMemo(() => createHtmlPortalNode(), []);
  const [height, setHeight] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, cardRef);

  const childNodes = typeof children === 'function' ? children({ expanded }) : children;

  if (!expandable) {
    return (
      <StyledCard {...props} level={2} divide expanded={expanded} ref={composedRefs}>
        {childNodes}
      </StyledCard>
    );
  }

  // Use a slot for actions, so we can easily append the expand button to user-provided actions
  const slots = getSlots(childNodes, {
    actions: Actions,
  });

  const onOpenChange = (open: boolean) => {
    if (open && cardRef.current) {
      setHeight(cardRef.current.offsetHeight);
    }

    setExpanded(open);
  };

  return (
    <DialogPrimitive.Root open={expanded} onOpenChange={onOpenChange} defaultOpen>
      <InPortal node={portalNode}>
        <StyledCard {...props} level={2} divide expanded={expanded} ref={composedRefs}>
          <Pane.Actions>
            {slots.actions}

            {expanded ? (
              <DialogPrimitive.Close asChild>
                <IconButton icon={ExitFullScreenIcon} label="exit fullscreen" variant="secondary" />
              </DialogPrimitive.Close>
            ) : (
              <DialogPrimitive.Trigger asChild>
                <IconButton icon={EnterFullScreenIcon} label="enter fullscreen" variant="secondary" />
              </DialogPrimitive.Trigger>
            )}
          </Pane.Actions>

          {slots.children}
        </StyledCard>
      </InPortal>

      {!expanded ? <OutPortal node={portalNode} /> : <StyledPlaceholderCard css={{ height }} />}

      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledDialogContent>{expanded ? <OutPortal node={portalNode} /> : null}</StyledDialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

export const Card = Object.assign(Root, {
  Title: Pane.Title,
  Description: Pane.Description,
  Tabs: Pane.Tabs,
  Body,
  Actions,
});
