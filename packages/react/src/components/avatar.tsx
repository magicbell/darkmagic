import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { ComponentProps, styled } from '../lib/stitches.js';

const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  flex: 'none',

  defaultVariants: {
    variant: 'circle',
  },

  variants: {
    variant: {
      circle: {
        borderRadius: '100%',
      },
      square: {
        borderRadius: '$lg',
      },
    },
    size: {
      lg: {
        width: '$12',
        height: '$12',
      },
      md: {
        width: '$10',
        height: '$10',
      },
      sm: {
        width: '$8',
        height: '$8',
      },
    },
  },
});

const AvatarImage = styled(AvatarPrimitive.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  font: '$caption',

  backgroundColor: 'transparent',
  border: '1px solid transparent',
  borderRadius: 'inherit',

  variants: {
    color: {
      default: { $$color: '$colors$text-default' },
      primary: { $$color: '$colors$text-link' },
      muted: { $$color: '$colors$text-muted' },
      error: { $$color: '$colors$text-error' },
      warning: { $$color: '$colors$text-warning' },
      success: { $$color: '$colors$text-success' },
      info: { $$color: '$colors$text-info' },
      'accent-1': { $$color: '$colors$accent-1-text' },
      'accent-2': { $$color: '$colors$accent-2-text' },
      'accent-3': { $$color: '$colors$accent-3-text' },
      'accent-4': { $$color: '$colors$accent-4-text' },
      'accent-5': { $$color: '$colors$accent-5-text' },
    },
    fill: {
      true: {
        backgroundColor: '$$color',
        color: '$text-default',
        borderColor: 'transparent',
      },
      false: {
        backgroundColor: 'transparent',
        color: '$$color',
        borderColor: '$$color',
      },
    },
  },

  compoundVariants: [
    { fill: true, color: 'primary', css: { $$color: '$colors$primary-bg' } },
    { fill: true, color: 'error', css: { $$color: '$colors$error-bg-solid' } },
    { fill: true, color: 'warning', css: { $$color: '$colors$warning-bg-solid' } },
    { fill: true, color: 'success', css: { $$color: '$colors$success-bg-solid' } },
    { fill: true, color: 'info', css: { $$color: '$colors$info-bg-solid' } },
    { fill: true, color: 'accent-1', css: { $$color: '$colors$accent-1-bg' } },
    { fill: true, color: 'accent-2', css: { $$color: '$colors$accent-2-bg' } },
    { fill: true, color: 'accent-3', css: { $$color: '$colors$accent-3-bg' } },
    { fill: true, color: 'accent-4', css: { $$color: '$colors$accent-4-bg' } },
    { fill: true, color: 'accent-5', css: { $$color: '$colors$accent-5-bg' } },
  ],
});

type AvatarRootProps = ComponentProps<typeof AvatarRoot>;
type AvatarFallbackProps = ComponentProps<typeof AvatarFallback>;

type AvatarProps = {
  /**
   * The image source to use for the avatar.
   */
  src?: string;
  /**
   * An alt text for screen readers
   */
  alt?: string;
  /**
   * A fallback property to render if no image is provided or not loaded in time.
   */
  children?: React.ReactNode;
  /**
   * The size of the avatar.
   */
  size?: AvatarRootProps['size'];
  /**
   * The color of the fallback/text style
   */
  color?: AvatarFallbackProps['color'];
  /**
   * The shape of the avatar.
   */
  variant?: AvatarRootProps['variant'];
};

function getLetters(value: string) {
  return value
    .replace(/[^a-zA-Z ]/g, '')
    .split(/(?=[A-Z])| /) // split on capital letters and spaces
    .map((word) => word[0])
    .join('')
    .slice(0, 2);
}

export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarRoot>, AvatarProps>(function Avatar(
  { src, alt, size = 'md', color = 'default', variant = 'circle', children }: AvatarProps,
  forwardedRef,
) {
  const fallback = !children ? 'n/a' : typeof children === 'string' ? getLetters(children) : children;

  return (
    <AvatarRoot size={size} variant={variant} ref={forwardedRef}>
      {src ? <AvatarImage src={src} alt={alt} /> : null}
      <AvatarFallback color={color} fill={typeof children !== 'string'} delayMs={src ? 600 : undefined}>
        {fallback}
      </AvatarFallback>
    </AvatarRoot>
  );
});
