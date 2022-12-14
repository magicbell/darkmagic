import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-ui/react-icons';
import { cloneElement, ElementRef, forwardRef, ReactNode, useMemo, useRef, useState } from 'react';
import { isElement } from 'react-is';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';

import { createSlot, getSlots } from '../lib/slots';
import { ComponentProps, keyframes, styled } from '../lib/stitches';
import { Flex } from './flex';
import { IconButton } from './icon-button';
import { ScrollArea } from './scroll-area';
import { Typography } from './typography';

const StyledHeaderContent = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  userSelect: 'none',
  alignItems: 'center',
  padding: '$4 $6',

  variants: {
    variant: {
      default: {},
      pane: {
        padding: '$8 $8 0 $8',
      },
    },
  },
});

const StyledHeaderTabs = styled('div', {
  padding: '0 $6',

  variants: {
    variant: {
      default: {},
      pane: {
        padding: '$4 $8 0 $8',
      },
    },

    tabs: {
      contained: {
        paddingBottom: '$4',
      },
      underline: {},
    },
  },

  compoundVariants: [{ variant: 'pane', tabs: 'contained', css: { paddingBottom: 0 } }],
});

const StyledHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none',
  flex: 'none',

  variants: {
    variant: {
      default: {
        borderBottom: `1px solid $border-muted`,
      },
      pane: {},
    },

    tabs: {
      underline: {
        [`& ${StyledHeaderTabs}`]: {
          marginBottom: -1,
        },
      },
      contained: {},
    },
  },
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

  width: '100%',
  flex: 'auto',
  minHeight: 0,

  '& > [data-radix-scroll-area-viewport], & > * > [data-radix-scroll-area-viewport]': {
    padding: '$4 $6',
  },

  '&:first-child > [data-radix-scroll-area-viewport], &:first-child > * > [data-radix-scroll-area-viewport]': {
    padding: '$6',
  },

  variants: {
    variant: {
      pane: {
        '& > [data-radix-scroll-area-viewport], & > * > [data-radix-scroll-area-viewport]': {
          padding: '$8',
        },
      },
    },
    scroll: {
      none: {
        padding: '$6 $4',
        '&:only-child': {
          padding: '$6',
        },
      },
      both: {},
      vertical: {},
      horizontal: {},
    },
  },

  compoundVariants: [{ scroll: 'none', variant: 'pane', css: { padding: '$8' } }],

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
  children?: ReactNode;

  /**
   * Scrollbars are only shown when the content is overflowing.
   */
  scroll?: 'horizontal' | 'vertical' | 'both' | 'none';
};

const Body = forwardRef<ElementRef<typeof StyledBody>, BodyProps>(function Body(
  { children, scroll = 'vertical', ...props },
  ref,
) {
  return (
    <StyledBody {...props} scroll={scroll} ref={ref}>
      {scroll === 'none' ? children : <ScrollArea direction={scroll}>{children}</ScrollArea>}
    </StyledBody>
  );
});

const StyledPlaceholderCard = styled('div', {
  borderRadius: '$lg',
  backgroundColor: '$bg-default',
  border: '1px solid $border-muted',
  width: '100%',
});

const StyledCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 'auto',

  variants: {
    variant: {
      default: {
        border: '1px solid $border-muted',
        borderRadius: '$lg',
      },
      pane: {},
    },

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

type StyledCardProps = ComponentProps<typeof StyledCard>;

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

  /**
   * The variant of the panel, one `root` panel can contain multiple `nested` or `headless` panels.
   */
  variant?: StyledCardProps['variant'];
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

const Root = forwardRef<ElementRef<typeof StyledCard>, CardProps>(function Card(
  { children, expandable = false, variant = 'default', ...props },
  forwardedRef,
) {
  const [expanded, setExpanded] = useState(false);
  const portalNode = useMemo(() => createHtmlPortalNode(), []);
  const [height, setHeight] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, cardRef);

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

  const body = isElement(slots.body) ? cloneElement(slots.body, { variant }) : null;

  const pane = (
    <StyledCard {...props} variant={variant} expanded={expanded} ref={composedRefs}>
      {hasHeader && (
        <StyledHeader variant={variant} tabs={tabVariant}>
          <StyledHeaderContent variant={variant}>
            <Flex direction={'column'} gap={1} flex="auto">
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

              {expandable && expanded ? (
                <DialogPrimitive.Close asChild>
                  <IconButton icon={ExitFullScreenIcon} label="exit fullscreen" variant="secondary" />
                </DialogPrimitive.Close>
              ) : expandable ? (
                <DialogPrimitive.Trigger asChild>
                  <IconButton icon={EnterFullScreenIcon} label="enter fullscreen" variant="secondary" />
                </DialogPrimitive.Trigger>
              ) : null}
            </StyledActions>
          </StyledHeaderContent>

          {slots.tabs && (
            <StyledHeaderTabs variant={variant} tabs={tabVariant}>
              {slots.tabs}
            </StyledHeaderTabs>
          )}
        </StyledHeader>
      )}

      {body}
      {slots.children}
    </StyledCard>
  );

  if (!expandable) {
    return pane;
  }

  const onOpenChange = (open: boolean) => {
    if (open && cardRef.current) {
      setHeight(cardRef.current.offsetHeight);
    }

    setExpanded(open);
  };

  return (
    <DialogPrimitive.Root open={expanded} onOpenChange={onOpenChange} defaultOpen>
      <InPortal node={portalNode}>{pane}</InPortal>

      {!expanded ? <OutPortal node={portalNode} /> : <StyledPlaceholderCard css={{ height }} />}

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
