import { ElementRef, forwardRef, FunctionComponent, ReactElement, ReactNode } from 'react';

import { makeComponent } from '../lib/component';
import { ComponentProps, styled } from '../lib/stitches';

const StyledBadge = styled('div', {
  font: '$body-small',
  color: '$text-default',
  display: 'inline-flex',
  alignItems: 'center',
  userSelect: 'none',
  gap: '$2',

  '& svg': {
    flex: 'none',
  },

  variants: {
    color: {
      muted: { '& svg': { color: '$text-muted' } },
      info: { '& svg': { color: '$text-info' } },
      success: { '& svg': { color: '$text-success' } },
      warning: { '& svg': { color: '$text-warning' } },
      error: { '& svg': { color: '$text-error' } },
      'accent-1': { '& svg': { color: '$accent-1-text' } },
      'accent-2': { '& svg': { color: '$accent-2-text' } },
      'accent-3': { '& svg': { color: '$accent-3-text' } },
    },
  },
});

const DotIcon = function DotIcon() {
  return (
    <svg width={8} height={8} viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
};

type StyledBadgeProps = ComponentProps<typeof StyledBadge>;
type BadgeProps = {
  /**
   * The icon to show before the label. Defaults to a filled dot.
   */
  icon?: FunctionComponent | ReactElement;
  /**
   * The color of the leading icon.
   */
  color?: StyledBadgeProps['color'];
  /**
   * The label to show. Any valid React node is allowed, but a short string is recommended.
   */
  children?: ReactNode;
};

export const Badge = forwardRef<ElementRef<typeof StyledBadge>, BadgeProps>(function Badge(
  { icon, color = 'muted', children, ...props },
  ref,
) {
  const Icon = makeComponent(icon) || DotIcon;

  return (
    <StyledBadge color={color} {...props} ref={ref}>
      <Icon aria-hidden="true" />
      {children ? <div>{children}</div> : null}
    </StyledBadge>
  );
});
