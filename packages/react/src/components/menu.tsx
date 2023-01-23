import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { createContext, ElementRef, forwardRef, FunctionComponent, ReactElement, ReactNode, useContext } from 'react';

import { makeComponent } from '../lib/component';
import { ComponentProps, styled } from '../lib/stitches';
import { Box } from './box';
import { Tooltip } from './tooltip';

type StyledMenuProps = ComponentProps<typeof StyledMenu>;
const StyledMenu = styled('nav', {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  padding: '$2',

  variants: {
    spacing: {
      none: { gap: 0 },
      xs: { gap: '$2' },
    },

    variant: {
      primary: { padding: '$8 $2' },
      secondary: { padding: '$8 0 $8 $2', marginRight: '-1px' },
    },
  },
});

const StyledMenuGroup = styled('div', {
  padding: '$2',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  variants: {
    divide: {
      true: {
        '&:before': {
          position: 'absolute',
          content: '""',
          display: 'block',
          borderTop: '1px solid $border-muted',
          top: 0,
          left: '$2',
          right: '$2',
        },
      },
    },

    spacing: {
      none: { gap: 0 },
      xs: { gap: '$2' },
    },
  },
});

type StyledMenuItemProps = ComponentProps<typeof StyledMenuItem>;
const StyledMenuItem = styled('div', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  // Custom reset
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'start',
  alignItems: 'center',
  lineHeight: '$normal',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  cursor: 'pointer',

  // Custom
  font: '$body-small',
  borderRadius: '$base',
  height: '$8',
  width: '100%',
  padding: '0 $2',

  '&:focus': { outline: 'none' },
  '&&:disabled': { opacity: 0.65, pointerEvents: 'none' },
  color: '$text-default',
  textDecoration: 'none',

  variants: {
    collapsed: {
      true: {
        width: 'fit-content',
      },
    },
    variant: {
      primary: {
        '&[data-state="active"]': {
          backgroundColor: '$primary-bg',
          color: '$text-default',
        },

        '&[data-state="inactive"]:hover, &[data-state="inactive"]:focus-visible': {
          color: '$text-link-hover',
        },

        '&[data-state="inactive"]:active': {
          color: '$text-link',
        },
      },
      secondary: {
        borderRightRadius: '0',
        '&[data-state="active"]': {
          backgroundColor: '$bg-active',
          color: '$text-default',
        },

        '&[data-state="inactive"]:hover, &[data-state="inactive"]:focus-visible': {
          color: '$text-link-hover',
        },

        '&[data-state="inactive"]:active': {
          color: '$text-link',
        },
      },
    },
  },
});

type StyledMenuTitleProps = ComponentProps<typeof StyledMenuTitle>;
const StyledMenuTitle = styled('div', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',

  // Custom
  font: '$body-small-bold',
  color: '$text-muted',
  padding: '$4 $4 $2 $4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  gap: '$1',

  variants: {
    hasLeadingAddon: { true: { paddingLeft: 0 } },
    color: {
      highlight: { color: '$text-highlight', '&:first-child': { paddingTop: 0 } },
    },
    action: {
      true: {
        padding: '$2 $4',
      },
    },
  },
});

type MenuTitleProps = {
  /**
   * An option action (button) to show before the title.
   */
  leadingAddon?: FunctionComponent | ReactElement;
  /**
   * An optional action (button) to show after the title.
   */
  trailingAddon?: FunctionComponent | ReactElement;

  /**
   * The color of the text.
   */
  color?: StyledMenuTitleProps['color'];

  /**
   * The title text.
   */
  children?: ReactNode;
};

const MenuTitle = forwardRef<ElementRef<typeof StyledMenuTitle>, MenuTitleProps>(function MenuTitle(
  { children, leadingAddon, trailingAddon, ...props },
  ref,
) {
  const LeadingAddon = makeComponent(leadingAddon);
  const TrailingAddon = makeComponent(trailingAddon);

  return (
    <StyledMenuTitle hasLeadingAddon={Boolean(LeadingAddon)} {...props} ref={ref}>
      {LeadingAddon && <LeadingAddon />}
      <Box flex="auto">{children}</Box>
      {TrailingAddon && <TrailingAddon />}
    </StyledMenuTitle>
  );
});

const StyledLabel = styled('div', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',

  // Custom
  padding: '0 $2',
  flex: 'auto',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const IconWrapper = styled('span', {
  display: 'inline-flex',
  flex: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  width: '$8',
  height: '$8',
});

type MenuItemPros = {
  /**
   * An optional icon to show before the button text.
   */
  icon?: FunctionComponent | ReactElement;
  /**
   * An optional action (button) to show after the button text.
   */
  addon?: FunctionComponent | ReactElement;
  /**
   * Set to true if this menu item should be marked active.
   */
  active?: boolean;
  /**
   * Set to true to only show the icon. This property is usually controlled via
   * the parent.
   */
  collapsed?: boolean;

  children?: StyledMenuItemProps['children'];
  variant?: StyledMenuItemProps['variant'];
};

const MenuItem = forwardRef<ElementRef<typeof StyledMenuItem>, MenuItemPros>(function MenuItem(
  {
    icon,
    addon,
    children,
    variant: variantFromProps = 'primary',
    active,
    collapsed: collapsedFromProps = false,
    ...props
  },
  ref,
) {
  const Icon = makeComponent(icon);
  const Addon = makeComponent(addon);
  const context = useContext(MenuContext);

  const collapsed = context?.collapsed ?? collapsedFromProps;
  const variant = context?.variant ?? variantFromProps;

  return (
    <Tooltip content={children} enabled={collapsed} side="right">
      <StyledMenuItem
        variant={variant}
        data-state={active ? 'active' : 'inactive'}
        collapsed={collapsed}
        {...props}
        ref={ref}
      >
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}

        {collapsed ? <VisuallyHidden>{children}</VisuallyHidden> : <StyledLabel>{children}</StyledLabel>}

        {Addon && <Addon />}
      </StyledMenuItem>
    </Tooltip>
  );
});

type MenuProps = {
  /**
   * The variant to use for the menu items.
   */
  variant?: StyledMenuItemProps['variant'];
  /**
   * Set to true to only show the icon. Don't use if the menu items don't have icons.
   * This property is usually used in conbination with a collapsable sidebar.
   */
  collapsed?: boolean;
  /**
   * The vertical gap between menu items.
   */
  spacing?: StyledMenuProps['spacing'];
} & StyledMenuProps;

const Root = forwardRef<ElementRef<typeof StyledMenu>, MenuProps>(function Menu(
  { children, collapsed = false, spacing, variant = 'primary', ...props },
  ref,
) {
  return (
    <MenuContext.Provider value={{ collapsed, variant }}>
      <StyledMenu spacing={spacing} variant={variant} {...props} ref={ref}>
        {children}
      </StyledMenu>
    </MenuContext.Provider>
  );
});

const MenuContext = createContext<MenuProps>({ collapsed: false, variant: 'primary' });

export const Menu = Object.assign(Root, {
  Title: MenuTitle,
  Item: MenuItem,
  Group: StyledMenuGroup,
});
