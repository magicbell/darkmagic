import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ElementRef, forwardRef, ReactNode, useEffect, useMemo, useState } from 'react';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import invariant from 'tiny-invariant';

import { createSlot, getSlots } from '../lib/slots';
import { ComponentProps, keyframes, styled } from '../lib/stitches';
import { IconButton } from './icon-button';
import { Pane } from './pane';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$bg-overlay',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms linear`,
  },
  zIndex: 1,
});

const StyledDialogContent = styled(DialogPrimitive.Content, {
  '&:focus': { outline: 'none' },
  display: 'flex',
  height: '100%',

  variants: {
    variant: {
      overlay: {
        position: 'fixed',
        top: '0',
        right: '0',
        zIndex: 1,
      },
      inline: {
        position: 'relative',
      },
    },
  },
});

type StyledDialogContentProps = ComponentProps<typeof StyledDialogContent>;

const StyledDrawer = styled(Pane, {
  borderLeft: '1px solid $border-muted',
  minHeight: '100%',
  backgroundColor: '$bg-app-2',
  boxShadow: 'rgb(0 0 0 / 20%) 0px 4px 24px',
  variants: {
    width: {
      xxs: { width: '$xs' },
      xs: { width: '$sm' },
      sm: { width: '$lg' },
      md: { width: '$2xl' },
      lg: { width: '$4xl' },
    },
  },
});

type StyledDrawerProps = ComponentProps<typeof StyledDrawer>;

type DrawerProps = {
  /**
   * The children to render inside the drawer.
   */
  children: ReactNode;
  /**
   * Inline variant is rendered inline like a pane, while the overlay variant is
   * rendered in a dialog and closed by clicking "outside".
   */
  variant?: StyledDialogContentProps['variant'];
  /**
   * The width of the drawer. Defaults to `md`.
   */
  width?: StyledDrawerProps['width'];
  /**
   * Event handler called when the user clicks the close button. Note that the
   * close button will not get rendered if this property is not provided.
   */
  onRequestClose?: () => void;
};

// Use a slot for actions, so we can easily add a close button to user-provided actions
const Actions = createSlot('Actions');

const Root = forwardRef<ElementRef<typeof StyledDrawer>, DrawerProps>(function Drawer(
  { children, variant = 'inline', width = 'md', onRequestClose, ...props },
  forwardedRef,
) {
  const portalNode = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createHtmlPortalNode();
  }, []);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(typeof document !== 'undefined'), []);

  const slots = getSlots(children, {
    actions: Actions,
  });

  const drawer = (
    <StyledDrawer variant="root" width={width} {...props} ref={forwardedRef}>
      <Pane.Actions>
        {slots.actions}

        {onRequestClose ? (
          <IconButton variant="secondary" icon={Cross2Icon} label="Close" onClick={() => onRequestClose()} />
        ) : null}
      </Pane.Actions>

      {slots.children}
    </StyledDrawer>
  );

  // deu react-reverse-portal, drawer only works on client side
  if (!isClient) return null;
  invariant(portalNode, 'portalNode must be defined');

  return (
    <DialogPrimitive.Root open={variant === 'overlay'} onOpenChange={() => onRequestClose?.()}>
      <InPortal node={portalNode}>{drawer}</InPortal>

      {variant === 'inline' ? <OutPortal node={portalNode} /> : null}

      <DialogPrimitive.Portal>
        <StyledOverlay />

        <StyledDialogContent variant={variant}>
          {variant === 'overlay' ? <OutPortal node={portalNode} /> : null}
        </StyledDialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

export const Drawer = Object.assign(Root, {
  Title: Pane.Title,
  Description: Pane.Description,
  Body: Pane.Body,
  Tabs: Pane.Tabs,
  Actions,
});
