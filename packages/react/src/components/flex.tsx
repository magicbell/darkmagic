import { ComponentProps, styled } from '../lib/stitches';
import { Box } from './box';

export type FlexProps = ComponentProps<typeof Flex>;

export const Flex = styled(Box, {
  boxSizing: 'border-box',
  '&&': {
    display: 'flex',
  },

  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'noWrap',
  },

  variants: {
    divide: { true: {} },
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
    },
    align: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
      between: {
        justifyContent: 'space-between',
      },
    },
    wrap: {
      noWrap: {
        flexWrap: 'nowrap',
      },
      wrap: {
        flexWrap: 'wrap',
      },
      wrapReverse: {
        flexWrap: 'wrap-reverse',
      },
    },
    gap: {
      1: { gap: '$1' },
      2: { gap: '$2' },
      3: { gap: '$3' },
      4: { gap: '$4' },
      5: { gap: '$5' },
      6: { gap: '$6' },
      7: { gap: '$7' },
      8: { gap: '$8' },
      9: { gap: '$9' },
      10: { gap: '$10' },
    },
  },
  compoundVariants: [
    {
      direction: 'row',
      divide: true,
      css: {
        '& > * + *': {
          borderLeft: '1px solid $border-muted',
        },
      },
    },
    {
      direction: 'rowReverse',
      divide: true,
      css: {
        '& > * + *': {
          borderRight: '1px solid $border-muted',
        },
      },
    },
    {
      direction: 'column',
      divide: true,
      css: {
        '& > * + *': {
          borderTop: '1px solid $border-muted',
        },
      },
    },
    {
      direction: 'columnReverse',
      divide: true,
      css: {
        '& > * + *': {
          borderBottom: '1px solid $border-muted',
        },
      },
    },
  ],
});
