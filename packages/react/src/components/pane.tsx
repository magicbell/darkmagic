import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-ui/react-icons';
import { useId } from '@radix-ui/react-id';
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
  padding: '0 $8',
  gap: '$2',

  variants: {
    variant: {
      pane: {
        paddingTop: '$8',
      },

      toolbar: {
        justifyContent: 'center',
        height: '$18',
        borderBottom: `1px solid $border-muted`,
      },
    },

    tabs: {
      contained: {},
      underline: {},
    },
  },

  compoundVariants: [{ variant: 'toolbar', tabs: 'contained', css: { borderBottom: 'none' } }],
});

const StyledHeaderTabs = styled('div', {
  padding: '$2 $8 0 $8',

  variants: {
    variant: {
      toolbar: { paddingTop: '$8' },
      pane: { paddingTop: '$6' },
    },
    tabs: {
      contained: {},
      underline: {
        borderBottom: `1px solid $border-muted`,
        '& > [role="tablist"]': {
          marginBottom: '-1px',
        },
      },
    },
  },
});

const StyledHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none',
  flex: 'none',

  variants: {
    variant: {
      pane: {},

      toolbar: {},
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
  flexDirection: 'column',
  minHeight: 0,

  variants: {
    scroll: {
      none: {},
      both: {},
      vertical: {},
      horizontal: {},
    },

    padding: {
      default: {
        '& > [data-radix-scroll-area-viewport], & > * > [data-radix-scroll-area-viewport]': {
          padding: '$8',
        },
      },
      none: {
        padding: 0,

        '& > [data-radix-scroll-area-viewport], & > * > [data-radix-scroll-area-viewport]': {
          padding: '0',
        },
      },
    },
  },

  compoundVariants: [{ scroll: 'none', padding: 'default', css: { padding: '$8' } }],

  '& > [data-radix-scroll-area-viewport], & > * > [data-radix-scroll-area-viewport]': {
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

type StyledPaneBodyProps = ComponentProps<typeof StyledBody>;

type BodyProps = {
  children?: React.ReactNode;

  /**
   * Panes with nested panes should have no padding.
   */
  padding?: StyledPaneBodyProps['padding'];

  /**
   * Scrollbars are only shown when the content is overflowing.
   */
  scroll?: 'horizontal' | 'vertical' | 'both' | 'none';

  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
};

const Body = React.forwardRef<React.ElementRef<typeof StyledBody>, BodyProps>(function Body(
  { children, scroll = 'none', padding = 'default', ...props },
  ref,
) {
  return (
    <StyledBody {...props} padding={padding} scroll={scroll} ref={ref}>
      {scroll === 'none' ? children : <ScrollArea direction={scroll}>{children}</ScrollArea>}
    </StyledBody>
  );
});

const StyledPlaceholderPane = styled('div', {
  borderRadius: '$lg',
  backgroundColor: '$bg-default',
  border: '1px solid $border-muted',
  width: '100%',
});

const StyledPane = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 'auto',

  variants: {
    variant: {
      root: {},
      nested: {},
    },

    expanded: {
      true: {
        width: '90vw',
        minHeight: 'max($96, 40vh)',
        maxWidth: '$5xl',
        maxHeight: '85vh',
      },
    },

    width: {
      xxs: { flex: '0 0 $sizes-xs', minWidth: '1px' },
      xs: { flex: '0 0 $sizes-sm', minWidth: '1px' },
      sm: { flex: '0 0 $sizes-lg', minWidth: '1px' },
      md: { flex: '0 0 $sizes-2xl', minWidth: '1px' },
      lg: { flex: '0 0 $sizes-4xl', minWidth: '1px' },
      auto: { flex: '1 1 auto' },
      full: { flex: '1 1 100%' },
    },
  },
});

type StyledPaneProps = ComponentProps<typeof StyledPane>;

type PaneProps = {
  /**
   * The children to render inside the pane. This can be a react node, or a
   * render function to get access to the panes expanded state.
   */
  children: React.ReactNode | ((options: { expanded: boolean }) => React.ReactNode);

  /**
   * When set to `true`, the pane gets a "full screen" action button, which shows
   * the pane in a modal on click. Defaults to `false`.
   */
  expandable?: boolean;

  /**
   * The variant of the panel, one `root` panel can contain multiple `nested` panels.
   */
  variant?: StyledPaneProps['variant'];

  /**
   * The width of the pane. Defaults to `auto`.
   */
  width?: StyledPaneProps['width'];

  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;

  /**
   * True when rendered as a drawer, this an internal prop that you shouldn't need
   */
  drawer?: boolean;
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

const Root = React.forwardRef<React.ElementRef<typeof StyledPane>, PaneProps>(function Pane(
  { children, expandable = false, variant = 'nested', width = 'auto', drawer, ...props },
  forwardedRef,
) {
  const id = useId();
  const [expanded, setExpanded] = React.useState(false);
  const portalNode = React.useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createHtmlPortalNode();
  }, []);
  const [height, setHeight] = React.useState(0);
  const isClient = useIsClient();

  const paneRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, paneRef);

  const childNodes = typeof children === 'function' ? children({ expanded }) : children;

  // Use a slot for actions, so we can easily append the expand button to user-provided actions
  const slots = getSlots(childNodes, {
    title: Title,
    description: Description,
    actions: Actions,
    tabs: Tabs,
  });

  const hasHeader = Boolean(slots.title || slots.description || slots.actions || slots.tabs || expandable);
  const headerVariant = variant === 'root' ? 'toolbar' : 'pane';
  const tabVariant = isElement(slots.tabs)
    ? ((slots.tabs.props.variant || 'underline') as 'underline' | 'contained')
    : undefined;

  if (variant === 'root' && tabVariant === 'underline') {
    throw new Error('Pane variant "root" should specify tab variant "contained".');
  }

  const title = (
    <Typography
      // don't override the id provided by the drawer.title
      {...(drawer ? {} : { id })}
      as={variant === 'root' ? 'h1' : 'h2'}
      variant="h2"
      color="default"
      css={variant === 'root' ? { fontSize: '1.3125rem' } : undefined}
      truncate
    >
      {slots.title}
    </Typography>
  );

  const aria = {
    'aria-labelledby': id,
    role: 'region',
  };

  const pane = (
    <StyledPane
      {...props}
      // wrapping dialog provides aria props for drawers
      {...(drawer ? {} : aria)}
      width={width}
      variant={variant}
      expanded={expanded}
      ref={composedRefs}
    >
      {hasHeader && (
        <StyledHeader variant={headerVariant}>
          <StyledHeaderContent variant={headerVariant}>
            <Flex
              direction={variant === 'root' ? 'row' : 'column'}
              gap={variant === 'root' ? 6 : undefined}
              flex="auto"
              align={variant === 'root' ? 'baseline' : undefined}
              css={{ minWidth: 1 }}
            >
              {drawer ? <DialogPrimitive.Title asChild>{title}</DialogPrimitive.Title> : title}

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

          {slots.tabs && (
            <StyledHeaderTabs variant={headerVariant} tabs={tabVariant}>
              {slots.tabs}
            </StyledHeaderTabs>
          )}
        </StyledHeader>
      )}

      {slots.children}
    </StyledPane>
  );

  // deu react-reverse-portal, expandable panes only work on client side
  if (!expandable || !isClient) {
    return pane;
  }

  const onOpenChange = (open: boolean) => {
    if (open && paneRef.current) {
      setHeight(paneRef.current.offsetHeight);
    }

    setExpanded(open);
  };

  invariant(portalNode, 'portalNode must be defined');

  return (
    <DialogPrimitive.Root open={expanded} onOpenChange={onOpenChange} defaultOpen>
      <InPortal node={portalNode}>{pane}</InPortal>

      {!expanded ? <OutPortal node={portalNode} /> : <StyledPlaceholderPane css={{ height }} />}

      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledDialogContent>{expanded ? <OutPortal node={portalNode} /> : null}</StyledDialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

export const Pane = Object.assign(Root, {
  Title,
  Description,
  Tabs,
  Body,
  Actions,
});
