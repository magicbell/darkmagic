import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { isElement } from 'react-is';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import invariant from 'tiny-invariant';

import { useIsClient } from '../hooks/use-is-client.js';
import { createSlot, getSlots } from '../lib/slots.js';
import { ComponentProps, CSS, keyframes, styled } from '../lib/stitches.js';
import { Flex } from './flex.js';
import { IconButton } from './icon-button.js';
import { ScrollArea } from './scroll-area.js';
import { Typography } from './typography.js';

const StyledHeaderContent = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  userSelect: 'none',
  alignItems: 'center',
  padding: '$8 $8 0 $8',
});

const StyledHeaderTabs = styled('div', {
  variants: {
    tabs: {
      contained: {
        padding: '$6 $8 $4 $8',
      },
      underline: {
        padding: '$6 0 0 0',
        // move padding to tablist, so that the bottom border spans full width
        '& > [role="tablist"]': {
          padding: '0 $8',
        },
        // marginBottom: -1,
        // borderBottom: `1px solid $border-muted`,
      },
    },
  },
});

const StyledHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none',
  flex: 'none',
});

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

const StyledActions = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$2',
  flex: 'none',
});

const StyledBody = styled('div', {
  display: 'flex',
  font: '$body-small',
  color: '$text-default',
  position: 'relative',
  flexDirection: 'column',
  width: '100%',
  flex: 'auto',
  minHeight: 0,

  '& > [data-radix-scroll-area-viewport], & > * > [data-radix-scroll-area-viewport]': {
    padding: '$8',
    paddingTop: '$$gap',
  },

  variants: {
    scroll: {
      none: {
        padding: '$8',
        paddingTop: '$$gap',
      },
    },
  },

  '&& > [data-radix-scroll-area-viewport], && > * > [data-radix-scroll-area-viewport]': {
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

type BodyProps = {
  children?: React.ReactNode;

  /**
   * Scrollbars are only shown when the content is overflowing.
   */
  scroll?: 'horizontal' | 'vertical' | 'both' | 'none';
};

const Body = React.forwardRef<React.ElementRef<typeof StyledBody>, BodyProps>(function Body(
  { children, scroll = 'vertical', ...props },
  ref,
) {
  return (
    <StyledBody {...props} scroll={scroll === 'none' ? 'none' : undefined} ref={ref}>
      {scroll === 'none' ? children : <ScrollArea direction={scroll}>{children}</ScrollArea>}
    </StyledBody>
  );
});

const StyledPlaceholderCard = styled('div', {
  borderRadius: '$lg',
  backgroundColor: '$bg-default',
  width: '100%',

  variants: {
    variant: {
      outline: {
        border: '1px solid $border-muted',
      },
      filled: {},
    },
  },
});

const StyledCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 'auto',

  variants: {
    variant: {
      outline: {
        border: '1px solid $border-muted',
        borderRadius: '$lg',
        backgroundColor: '$bg-app',
      },
      filled: {
        border: '1px solid $bg-app-2',
        borderRadius: '$lg',
        backgroundColor: '$bg-app-2',
      },
    },

    expanded: {
      true: {
        width: '90vw',
        minHeight: 'max($96, 40vh)',
        maxWidth: '$5xl',
        maxHeight: '85vh',
      },
    },

    gap: {
      none: {
        $$gap: 0,
      },
      md: {
        $$gap: '$sizes$8',
      },
    },
  },
});

type StyledCardProps = ComponentProps<typeof StyledCard>;

type CardProps = {
  /**
   * The children to render inside the card. This can be a react node, or a
   * render function to get access to the cards expanded state.
   */
  children: React.ReactNode | ((options: { expanded: boolean }) => React.ReactNode);

  /**
   * When set to `true`, the card gets a "full screen" action button, which shows
   * the card in a modal on click. Defaults to `false`.
   */
  expandable?: boolean;

  /**
   * The variant of the panel, one `root` panel can contain multiple `nested` or `headless` panels.
   */
  variant?: StyledCardProps['variant'];

  /**
   * The gap between the title/description and body
   */
  gap?: StyledCardProps['gap'];

  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
};

const Actions = createSlot('Actions');

const Title = createSlot('Title');
const Description = createSlot('Description');

/**
 * Rendering tabs inside this slot will reduce the amount of padding between the
 * header tabs and the content. Particularly useful in combination with
 * `<Tabs variant="underline">`.
 */
const Tabs = createSlot('Tabs');

const Root = React.forwardRef<React.ElementRef<typeof StyledCard>, CardProps>(function Card(
  { children, expandable = false, variant = 'outline', gap = 'md', ...props },
  forwardedRef,
) {
  const [expanded, setExpanded] = React.useState(false);
  const portalNode = React.useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createHtmlPortalNode();
  }, []);

  const [height, setHeight] = React.useState(0);

  const cardRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, cardRef);
  const isClient = useIsClient();
  const childNodes = typeof children === 'function' ? children({ expanded }) : children;

  // Use a slot for actions, so we can easily append the expand button to user-provided actions
  const slots = getSlots(childNodes, {
    title: Title,
    description: Description,
    actions: Actions,
    tabs: Tabs,
    body: Body,
  });

  const hasHeader = Boolean(slots.title || slots.description || slots.actions || slots.tabs || expandable);
  const tabVariant = isElement(slots.tabs)
    ? ((slots.tabs.props.variant || 'underline') as 'underline' | 'contained')
    : undefined;

  const body = isElement(slots.body) ? React.cloneElement(slots.body as React.ReactElement, { variant }) : null;

  const pane = (
    <StyledCard {...props} gap={gap} variant={variant} expanded={expanded} ref={composedRefs}>
      {hasHeader && (
        <StyledHeader>
          <StyledHeaderContent>
            <Flex direction="column" gap={1} flex="auto">
              <Typography as="h2" variant="h2" color="default">
                {slots.title}
              </Typography>
              {slots.description && (
                <Typography variant="small" color="muted">
                  {slots.description}
                </Typography>
              )}
            </Flex>
            <StyledActions>
              {slots.actions}

              {expandable && expanded && isClient ? (
                <DialogPrimitive.Close asChild>
                  <IconButton icon={ExitFullScreenIcon} label="exit fullscreen" variant="secondary" />
                </DialogPrimitive.Close>
              ) : expandable && isClient ? (
                <DialogPrimitive.Trigger asChild>
                  <IconButton icon={EnterFullScreenIcon} label="enter fullscreen" variant="secondary" />
                </DialogPrimitive.Trigger>
              ) : null}
            </StyledActions>
          </StyledHeaderContent>

          {slots.tabs && <StyledHeaderTabs tabs={tabVariant}>{slots.tabs}</StyledHeaderTabs>}
        </StyledHeader>
      )}

      {body}
      {slots.children}
    </StyledCard>
  );

  // deu react-reverse-portal, expandable cards only work on client side
  if (!expandable || !isClient) {
    return pane;
  }

  invariant(portalNode, 'portalNode must be defined');

  const onOpenChange = (open: boolean) => {
    if (open && cardRef.current) {
      setHeight(cardRef.current.offsetHeight);
    }

    setExpanded(open);
  };

  return (
    <DialogPrimitive.Root open={expanded} onOpenChange={onOpenChange} defaultOpen>
      <InPortal node={portalNode}>{pane}</InPortal>

      {!expanded ? <OutPortal node={portalNode} /> : <StyledPlaceholderCard variant={variant} css={{ height }} />}

      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledDialogContent>{expanded ? <OutPortal node={portalNode} /> : null}</StyledDialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

export const Card = Object.assign(Root, {
  Title,
  Description,
  Tabs,
  Body,
  Actions,
});
