import * as React from 'react';

import { ComponentProps, styled } from '../lib/stitches.js';
import { Menu } from './menu.js';

const StyledSidebar = styled('div', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  // Custom
  display: 'flex',
  flexDirection: 'column',
  flex: 'none',

  borderRight: '1px solid $border-muted',
  width: '$55',
  height: '100%',
  variants: {
    collapsed: {
      true: {
        width: '$16',
      },
    },
  },
});

const SidebarMenu = styled(Menu, {
  padding: '$8 $2',

  variants: {
    variant: {
      primary: {
        padding: '$8 $2',
      },
      secondary: {
        padding: '$8 $2',
      },
      footer: {
        padding: '$8 $2 $6 $2',
      },
    },
  },
});

type SidebarMenuProps = ComponentProps<typeof SidebarMenu>;

type RootProps = {
  /**
   * The variant to use for the menu items.
   */
  variant?: SidebarMenuProps['variant'];

  /**
   * The children to render, usually components of type `Menu` and `MiniCard`.
   */
  children?: React.ReactNode;
};

const Root = React.forwardRef<React.ElementRef<typeof StyledSidebar>, RootProps>(function Sidebar(
  { children, ...props },
  ref,
) {
  return (
    <StyledSidebar ref={ref} {...props}>
      {children}
    </StyledSidebar>
  );
});

export const Sidebar = Object.assign(Root, {
  Menu: SidebarMenu,
});
