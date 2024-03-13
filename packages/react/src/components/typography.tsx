import * as React from 'react';

import { ComponentProps, CSS, styled } from '../lib/stitches.js';

const StyledTypography = styled('div', {
  lineHeight: '1',
  margin: '0',
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',
  display: 'block',

  variants: {
    noWrap: {
      true: {
        whiteSpace: 'nowrap',
      },
    },

    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },

    noSelect: {
      true: {
        userSelect: 'none',
      },
    },

    variant: {
      h1: {
        font: '$heading-lg',
      },

      h2: {
        font: '$heading-md',
      },

      'page-title': {
        font: '$heading-lg',
      },

      'section-heading': {
        font: '$heading-md',
      },

      default: {
        font: '$body-default',
      },

      small: {
        font: '$body-small',
      },

      bold: {
        font: '$body-small-bold',
      },

      caption: {
        font: '$caption',
      },
    },

    color: {
      default: {
        color: '$text-default',
      },

      muted: {
        color: '$text-muted',
      },

      highlight: {
        color: '$text-highlight',
      },

      info: {
        color: '$text-info',
      },

      success: {
        color: '$text-success',
      },

      warning: {
        color: '$text-warning',
      },

      error: {
        color: '$text-error',
      },

      link: {
        color: '$text-link',
      },
    },

    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
      justify: { textAlign: 'justify' },
    },
  },
});

type StyledTypographyProps = ComponentProps<typeof StyledTypography>;

export type TypographyProps = {
  /**
   * The font style to use. This is a combination of font-family, font-style, font-weight, line-height and letter-spacing.
   */
  variant?: StyledTypographyProps['variant'];
  /**
   * The text color.
   */
  color?: StyledTypographyProps['color'];
  /**
   * Whether the text should be truncated with an ellipsis.
   */
  truncate?: StyledTypographyProps['truncate'];
  /**
   * Whether the text should be able to span multiple lines.
   */
  noWrap?: StyledTypographyProps['noWrap'];
  /**
   * Whether the text should be selectable.
   */
  noSelect?: StyledTypographyProps['noSelect'];

  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;

  /**
   * The text alignment.
   */
  align?: StyledTypographyProps['align'];
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
};

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(function Typography(
  { variant = 'default', color = 'default', ...props },
  ref,
) {
  return <StyledTypography variant={variant} color={color} {...props} ref={ref} />;
});
