import { ComponentProps as StitchesComponentProps, createStitches, CSS as StitchesCSS } from '@stitches/react';
import * as StyledComponent from '@stitches/react/types/styled-component';
import { useEffect, useState } from 'react';

import { cssReset } from './css-reset';

export type CSS = StitchesCSS<typeof config>;
export type VariantProps<Component extends { [key: symbol | string]: any }> =
  Component[StyledComponent.$$StyledComponentProps];

/**
 * A utility type to extract the props from a StyledComponent, while dropping
 * media queries from variants.
 */
export type ComponentProps<Component extends { [key: symbol | string]: any }> = Omit<
  StitchesComponentProps<Component>,
  keyof VariantProps<Component>
> &
  VariantProps<Component>;

export const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config, reset, prefix } =
  createStitches({
    theme: {
      colors: {
        'bg-overlay': 'rgba(8, 9, 12, 50%)',
        'bg-app': '#1B1D29',
        'bg-app-2': '#1E212F',
        'bg-default': '#23283B',
        'bg-hover': '#262E45',
        'bg-active': '#2A314D',

        'border-muted': '#354061',
        'border-default': '#3D4A76',
        'border-highlight': '#4D5E94',

        'text-muted': '#A09FA6',
        'text-default': '#EDEDEF',
        'text-highlight': '#FFEF5C',
        'text-link': '#9E8CFC',
        'text-link-hover': '#BCAFFD',
        'text-info': '#849DFF',
        'text-success': '#63C174',
        'text-warning': '#F1A10D',
        'text-error': '#F16A50',

        'primary-bg': '#6E56CF',
        'primary-bg-hover': '#7C66DC',
        'primary-bg-active': '#9E8CFC',

        'info-bg': '#192140',
        'info-border': '#273E89',
        'info-bg-solid': '#3E63DD',

        'success-bg': '#132819',
        'success-border': '#245530',
        'success-bg-solid': '#46A758',
        'success-bg-solid-hover': '#5DB46B',

        'warning-bg': '#341C00',
        'warning-border': '#693F05',
        'warning-bg-solid': '#FFB224',

        'error-bg': '#3B1813',
        'error-bg-hover': '#481A14',
        'error-bg-active': '#541C15',
        'error-border': '#7F2315',
        'error-border-hover': '#A42A12',
        'error-bg-solid': '#E54D2E',
        'error-bg-solid-hover': '#EC5E41',

        'accent-1-text': '#D864D8',
        'accent-1-bg': '#AB4ABA',
        'accent-2-text': '#0AC5B3',
        'accent-2-bg': '#12A594',
        'accent-3-text': '#FF8B3E',
        'accent-3-bg': '#F76808',
        'accent-4-text': '#00C2D7',
        'accent-4-bg': '#05A2C2',
        'accent-5-text': '#F65CB6',
        'accent-5-bg': '#D6409F',
      },

      space: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        10: '40px',
        12: '48px',
        14: '56px',
        '3xs': '2px',
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '40px',
        '3xl': '48px',
        '4xl': '56px',
      },
      fonts: {
        sans: `Inter, sans-serif`,
        serif: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
        mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
      },
      fontWeights: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      fontSizes: {
        xl: '1.5rem',
        lg: '1.125rem',
        md: '1rem',
        sm: '0.875rem',
        xs: '0.8125rem',
        xxs: '0.75rem',
        '3xs': '0.6875rem',
      },
      lineHeights: {
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        none: '1',
        tight: '1.2',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      letterSpacings: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      sizes: {
        '0': '0px',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '15': '3.75rem',
        '16': '4rem',
        '18': '4.5rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '30': '7.5rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '50': '12.5rem',
        '52': '13rem',
        '55': '13.75rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '70': '17.5rem',
        '72': '18rem',
        '80': '20rem',
        '90': '22.5rem',
        '96': '24rem',
        auto: 'auto',
        px: '1px',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        full: '100%',
        screen: '100vw',
        min: 'min-content',
        max: 'max-content',
        none: 'none',
        '2xs': '15rem', // 240px  - popover xs
        xs: '20rem', // 320px    -  popover sm / drawer xxs
        sm: '25rem', // 400px    -  popover md / drawer xs
        md: '28rem',
        lg: '32.5rem', // 520px   - popover lg / dialog sm  / drawer sm
        xl: '36rem',
        '2xl': '40rem', // 640px  - dialog md  / drawer md
        '3xl': '45rem',
        '4xl': '48rem', // 768px  - dialog lg / drawer lg
        '5xl': '64rem', // 1024px - max-width card
        '6xl': '72rem',
        '7xl': '80rem',
        prose: '65ch',
        ...Object.fromEntries(Object.entries(screens).map(([name, size]) => [`screen-${name}`, size])),
      },
      borderWidths: {
        '0': '0px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '1': '1px',
      },
      borderStyles: {},
      radii: {
        none: '0px',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: '0 0 #0000',
      },
      zIndices: {
        '0': '0',
        '1': '10',
        '2': '20',
        '3': '30',
        '4': '40',
        '5': '50',
      },
      transitions: {},
    },
    media: {
      light: '(prefers-color-scheme: light)',
      dark: '(prefers-color-scheme: dark)',
      ...(Object.fromEntries(Object.entries(screens).map(([name, size]) => [name, `(min-width: ${size})`])) as Record<
        keyof typeof screens,
        string
      >),
    },
    utils: {
      font: (variant: string) => {
        const variants = {
          'heading-lg': {
            font: '700 1.5rem/1.5 Inter, sans-serif',
            letterSpacing: 0,
          },
          'heading-md': {
            font: '700 1.125rem/1.5 Inter, sans-serif',
            letterSpacing: 0,
          },
          'body-default': {
            font: '400 1rem/1.5 Inter, sans-serif',
            letterSpacing: '-0.0125rem',
          },
          'body-small': {
            font: '400 0.875rem/1.5 Inter, sans-serif',
            letterSpacing: '-0.0125rem',
          },
          'body-small-bold': {
            font: '600 0.875rem/1.5 Inter, sans-serif',
            letterSpacing: '-0.005625rem',
          },
          caption: {
            font: '600 0.8125rem/1.5 Inter, sans-serif',
            letterSpacing: '-0.005625rem',
          },
          mono: {
            font: '400 0.8125rem/1.4 Fira Code, monospace',
            letterSpacing: '0',
          },
        };

        const key = variant.replace(/^\$/, '') as keyof typeof variants;
        return variants[key] || variants['body-default'];
      },

      bg: (value: any) => ({
        backgroundColor: value,
      }),

      text: (value: any) => ({
        color: value,
      }),

      p: (value: any) => ({
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      }),
      pt: (value: any) => ({
        paddingTop: value,
      }),
      pr: (value: any) => ({
        paddingRight: value,
      }),
      pb: (value: any) => ({
        paddingBottom: value,
      }),
      pl: (value: any) => ({
        paddingLeft: value,
      }),
      px: (value: any) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: any) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      m: (value: any) => ({
        marginTop: value,
        marginBottom: value,
        marginLeft: value,
        marginRight: value,
      }),
      mt: (value: any) => ({
        marginTop: value,
      }),
      mr: (value: any) => ({
        marginRight: value,
      }),
      mb: (value: any) => ({
        marginBottom: value,
      }),
      ml: (value: any) => ({
        marginLeft: value,
      }),
      mx: (value: any) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: any) => ({
        marginTop: value,
        marginBottom: value,
      }),

      spaceX: (value: any) => ({
        '& > * + *': {
          marginLeft: value,
        },
      }),

      spaceY: (value: any) => ({
        '& > * + *': {
          marginTop: value,
        },
      }),

      lh: (value: any) => ({
        lineHeight: value,
      }),

      ls: (value: any) => ({
        letterSpacing: value,
      }),

      borderLeftRadius: (value: any) => ({
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      }),

      borderRightRadius: (value: any) => ({
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      }),

      borderTopRadius: (value: any) => ({
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
      }),

      borderBottomRadius: (value: any) => ({
        borderBottomLeftRadius: value,
        borderBottomRightRadius: value,
      }),

      truncate: () => ({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    },
  });

export const globalStyles = globalCss({
  ...cssReset,
  '@import': [
    'url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap")',
    'url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&display=swap")',
  ],
  body: {
    background: '$bg-app',
    color: '$text-default',
    fontFamily: 'inter',
    '-webkit-font-smoothing': 'antialiased',

    '& [data-scroll]::-webkit-scrollbar': {
      width: '$2',
      height: '$2',
      backgroundColor: 'transparent',
    },

    '& [data-scroll]::-webkit-scrollbar-thumb': {
      borderRadius: '$base',
      backgroundColor: '$bg-default',
    },

    '& [data-scroll]::-webkit-scrollbar-track': {
      padding: 2,
      backgroundColor: 'transparent',
    },

    '& [data-scroll="y"]': {
      overflowY: 'auto',
    },

    '& [data-scroll="x"]': {
      overflowX: 'auto',
    },

    '& [data-scroll="xy"]': {
      overflow: 'auto',
    },

    '[data-radix-popper-content-wrapper]': {
      zIndex: '999 !important',
    },
  },
});

export function useMatchMedia(key: keyof typeof config.media) {
  const media = config.media[key];
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(media);
    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [media]);

  return matches;
}
