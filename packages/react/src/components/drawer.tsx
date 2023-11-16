import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import invariant from 'tiny-invariant';

import { createSlot, getSlots } from '../lib/slots.js';
import { ComponentProps, keyframes, styled } from '../lib/stitches.js';
import { IconButton } from './icon-button.js';
import { Pane } from './pane.js';

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
  height: '100%',
  backgroundColor: '$bg-app',
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
  children: React.ReactNode;
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
  /**
   * Event handler called when focus moves into the component after opening. It
   * can be prevented by calling event.preventDefault.
   */
  onOpenAutoFocus?: (event: Event) => void;
  /**
   * Event handler called when focus moves to the trigger after closing. It can
   * be prevented by calling event.preventDefault.
   */
  onCloseAutoFocus?: (event: Event) => void;
  /**
   * Event handler called when the user clicks outside the drawer.
   */
  onClickOutside?: (event: CustomEvent<{ originalEvent: PointerEvent }>) => void;
  /**
   * Whether the drawer blocks interaction with the page underneath. Defaults to
   * `true` for the overlay variant, and `false` for the inline variant.
   */
  modal?: boolean;
};

// Use a slot for actions, so we can easily add a close button to user-provided actions
const Actions = createSlot('Actions');

const Root = React.forwardRef<React.ElementRef<typeof StyledDrawer>, DrawerProps>(function Drawer(
  {
    children,
    variant = 'inline',
    width = 'md',
    onRequestClose,
    modal = variant === 'overlay',
    onClickOutside,
    onOpenAutoFocus,
    onCloseAutoFocus,
    ...props
  },
  forwardedRef,
) {
  const portalNode = React.useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createHtmlPortalNode();
  }, []);

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(typeof document !== 'undefined'), []);

  const slots = getSlots(children, {
    actions: Actions,
  });

  const drawer = (
    <StyledDrawer variant="root" width={width} {...props} ref={forwardedRef}>
      <Pane.Actions>
        {slots.actions}

        {onRequestClose ? (
          <IconButton
            tooltip="Close"
            shortcut="esc"
            variant="secondary"
            icon={Cross2Icon}
            label="Close"
            onClick={() => onRequestClose()}
          />
        ) : null}
      </Pane.Actions>

      {slots.children}
    </StyledDrawer>
  );

  // deu react-reverse-portal, drawer only works on client side
  if (!isClient) return null;
  invariant(portalNode, 'portalNode must be defined');

  const handlePointerDown = onClickOutside ? onClickOutside : () => onRequestClose?.();

  return (
    <DialogPrimitive.Root modal={modal} open={variant === 'overlay'}>
      <InPortal node={portalNode}>{drawer}</InPortal>

      {variant === 'inline' ? <OutPortal node={portalNode} /> : null}

      <DialogPrimitive.Portal>
        {modal !== false ? <StyledOverlay /> : null}

        <StyledDialogContent
          variant={variant}
          onPointerDownOutside={handlePointerDown}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
        >
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
