import { ElementRef, forwardRef, FunctionComponent, ReactElement, ReactNode } from 'react';

import { makeComponent } from '../lib/component';
import { ComponentProps, styled } from '../lib/stitches';

type StyledMiniCardProps = ComponentProps<typeof StyledMiniCard>;
const StyledMiniCard = styled('button', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  // Custom reset
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: '$normal',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // custom
  height: '$18',
  padding: '0 $2',
  width: '100%',

  '&[type="button"]:hover, &[type="button"]:focus-visible': {
    background: '$bg-hover',
  },
  '&[type="button"]:active': {
    background: '$bg-active',
  },

  variants: {
    collapsed: {
      true: {
        width: 'fit-content',
      },
    },
  },
});

const StyledContent = styled('div', {
  flex: '1 1 auto',
  minWidth: 1,
  padding: '0 $2 0 $1',
});

type MiniCardProps = {
  /**
   * An optional icon to show before the button text.
   */
  icon?: FunctionComponent | ReactElement;
  /**
   * An optional action (button) to show after the button text.
   */
  addon?: FunctionComponent | ReactElement;
  /**
   * The textual content to render inside the card. Usually this is a Text compnent.
   */
  children?: ReactNode;
  /**
   * Event handler called when the button is clicked. Note that providing the
   * onClick handler renders a button instead of a div. Don't provide a clickable
   * element to the addon prop when using the onClick handler.
   */
  onClick?: () => void;

  /**
   * Set to `true` to only show the icon. This property is usually controlled via
   * the parent.
   */
  collapsed?: boolean;
} & ComponentProps<typeof StyledMiniCard>;

const IconWrapper = styled('span', {
  display: 'inline-flex',
  flex: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 $1',
});

const Root = forwardRef<ElementRef<typeof StyledMiniCard>, MiniCardProps>(function MiniCard(
  { icon, children, addon, onClick, collapsed, ...props },
  ref,
) {
  const Icon = makeComponent(icon);
  const Addon = makeComponent(addon);

  const buttonProps: StyledMiniCardProps & { as?: string } = onClick ? { type: 'button', onClick } : { as: 'div' };

  return (
    <StyledMiniCard {...buttonProps} {...props} collapsed={collapsed} ref={ref}>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}

      {!collapsed && (
        <>
          <StyledContent>{children}</StyledContent>
          {Addon && <Addon />}
        </>
      )}
    </StyledMiniCard>
  );
});

export const MiniCard = Object.assign(Root, {});
