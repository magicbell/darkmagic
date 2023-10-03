import * as React from 'react';
import invariant from 'tiny-invariant';

import { makeComponent } from '../lib/component.js';
import { ComponentProps, styled } from '../lib/stitches.js';

const StyledIcon = styled('div', {
  color: '$text-default',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  userSelect: 'none',

  defaultVariants: {
    iconSize: 'md',
    containerSize: 'hug',
    color: 'default',
  },

  variants: {
    containerSize: {
      hug: {},
      xs: {
        height: '$6', // 24px
        width: '$6',
      },
      sm: {
        height: '$8', // 32px
        width: '$8',
      },
    },

    iconSize: {
      sm: {
        '& > *': {
          width: '0.9375rem', // 15px
          height: '0.9375rem',
        },
      },
      md: {
        '& > *': {
          width: '1.125rem', // 18px
          height: '1.125rem',
        },
      },
      lg: {
        '& > *': {
          width: '1.5rem', // 24px
          height: '1.5rem',
        },
      },
    },

    color: {
      default: {
        color: 'inherit',
      },
      primary: {
        color: '$text-link',
      },
      muted: {
        color: '$text-muted',
      },
      error: {
        color: '$text-error',
      },
      warning: {
        color: '$text-warning',
      },
      success: {
        color: '$text-success',
      },
      info: {
        color: '$text-info',
      },
      'accent-1': {
        color: '$accent-1-text',
      },
      'accent-2': {
        color: '$accent-2-text',
      },
      'accent-3': {
        color: '$accent-3-text',
      },
      'accent-4': {
        color: '$accent-4-text',
      },
      'accent-5': {
        color: '$accent-5-text',
      },
    },
  },
});

type StyledIconProps = ComponentProps<typeof StyledIcon>;
type IconProps = {
  /**
   * The icon to display.
   */
  icon: React.FunctionComponent | React.ReactElement;
  /**
   * The size of the icon
   */
  iconSize?: StyledIconProps['iconSize'];
  /**
   * Padding around the icon
   */
  containerSize?: StyledIconProps['containerSize'];
  /**
   * The color of the icon
   */
  color?: StyledIconProps['color'];
};

export function Icon({ iconSize = 'sm', containerSize = 'xs', color = 'default', icon }: IconProps) {
  const Icon = makeComponent(icon);
  invariant(Icon, 'icon requires element or component as icon prop');

  return (
    <StyledIcon iconSize={iconSize} containerSize={containerSize} color={color}>
      <Icon />
    </StyledIcon>
  );
}
