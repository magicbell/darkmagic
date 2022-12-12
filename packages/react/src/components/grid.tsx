import { ElementRef, forwardRef, ReactNode } from 'react';

import { ComponentProps, CSS, styled } from '../lib/stitches';

const StyledCell = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flex: 'none',

  variants: {
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
    },
    colSpan: {
      1: { gridColumn: 'span 1 / span 1' },
      2: { gridColumn: 'span 2 / span 2' },
      3: { gridColumn: 'span 3 / span 3' },
      4: { gridColumn: 'span 4 / span 4' },
      5: { gridColumn: 'span 5 / span 5' },
      6: { gridColumn: 'span 6 / span 6' },
      7: { gridColumn: 'span 7 / span 7' },
      8: { gridColumn: 'span 8 / span 8' },
      9: { gridColumn: 'span 9 / span 9' },
      10: { gridColumn: 'span 10 / span 10' },
      11: { gridColumn: 'span 11 / span 11' },
      12: { gridColumn: 'span 12 / span 12' },
      full: { gridColumn: '1 / -1' },
    },

    colStart: {
      1: { gridColumnStart: 1 },
      2: { gridColumnStart: 2 },
      3: { gridColumnStart: 3 },
      4: { gridColumnStart: 4 },
      5: { gridColumnStart: 5 },
      6: { gridColumnStart: 6 },
      7: { gridColumnStart: 7 },
      8: { gridColumnStart: 8 },
      9: { gridColumnStart: 9 },
      10: { gridColumnStart: 10 },
      11: { gridColumnStart: 11 },
      12: { gridColumnStart: 12 },
      13: { gridColumnStart: 13 },
      auto: { gridColumnStart: 'auto' },
    },

    colEnd: {
      1: { gridColumnEnd: 1 },
      2: { gridColumnEnd: 2 },
      3: { gridColumnEnd: 3 },
      4: { gridColumnEnd: 4 },
      5: { gridColumnEnd: 5 },
      6: { gridColumnEnd: 6 },
      7: { gridColumnEnd: 7 },
      8: { gridColumnEnd: 8 },
      9: { gridColumnEnd: 9 },
      10: { gridColumnEnd: 10 },
      11: { gridColumnEnd: 11 },
      12: { gridColumnEnd: 12 },
      13: { gridColumnEnd: 13 },
      auto: { gridColumnEnd: 'auto' },
    },

    rowSpan: {
      1: { gridRow: 'span 1 / span 1' },
      2: { gridRow: 'span 2 / span 2' },
      3: { gridRow: 'span 3 / span 3' },
      4: { gridRow: 'span 4 / span 4' },
      5: { gridRow: 'span 5 / span 5' },
      6: { gridRow: 'span 6 / span 6' },
      full: { gridRow: '1 / -1' },
    },

    rowStart: {
      1: { gridRowStart: 1 },
      2: { gridRowStart: 2 },
      3: { gridRowStart: 3 },
      4: { gridRowStart: 4 },
      5: { gridRowStart: 5 },
      6: { gridRowStart: 6 },
      7: { gridRowStart: 7 },
      auto: { gridRowStart: 'auto' },
    },

    rowEnd: {
      1: { gridRowEnd: 1 },
      2: { gridRowEnd: 2 },
      3: { gridRowEnd: 3 },
      4: { gridRowEnd: 4 },
      5: { gridRowEnd: 5 },
      6: { gridRowEnd: 6 },
      7: { gridRowEnd: 7 },
      auto: { gridRowEnd: 'auto' },
    },
  },
});

type StyledCellProps = ComponentProps<typeof StyledCell>;

type CellProps = {
  /**
   * Make an element span a specific number of columns.
   */
  colSpan?: StyledCellProps['colSpan'];
  /**
   * Make an element start at the nth grid line. Note that CSS grid lines
   * start at 1, not 0.
   */
  colStart?: StyledCellProps['colStart'];
  /**
   * Make an element end at the nth grid line. Note that CSS grid lines
   * start at 1, not 0. So to span the last cell in a six column grid, you'll
   * want to use `colEnd={7}`.
   */
  colEnd?: StyledCellProps['colEnd'];
  /**
   * Make an element span a specific number of rows. Note that CSS grid lines
   * start at 1, not 0.
   */
  rowSpan?: StyledCellProps['rowSpan'];
  /**
   * Make an element start at the nth grid line. Note that CSS grid lines
   * start at 1, not 0.
   */
  rowStart?: StyledCellProps['rowStart'];
  /**
   * Make an element end at the nth grid line. Note that CSS grid lines
   * start at 1, not 0. To span the last cell in a three row grid, you'll
   * want to use `rowEnd={4}`.
   */
  rowEnd?: StyledCellProps['rowEnd'];
  /**
   * Align the content of the cell.
   */
  justify?: StyledCellProps['justify'];
  /**
   * The content of the cell. Any valid ReactNode is allowed.
   */
  children?: ReactNode;
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
};

const Cell = forwardRef<ElementRef<'div'>, CellProps>(function Cell(props, ref) {
  return <StyledCell {...props} ref={ref} />;
});

const StyledGrid = styled('div', {
  all: 'unset',
  margin: '0',
  display: 'grid',
  width: '100%',

  variants: {
    cols: {
      1: { gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' },
      2: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
      3: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
      4: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
      5: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
      6: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
      7: { gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' },
      8: { gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' },
      9: { gridTemplateColumns: 'repeat(9, minmax(0, 1fr))' },
      10: { gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' },
      11: { gridTemplateColumns: 'repeat(11, minmax(0, 1fr))' },
      12: { gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' },
      none: { gridTemplateColumns: 'none' },
    },

    rows: {
      1: { gridTemplateRows: 'repeat(1, minmax(0, 1fr))' },
      2: { gridTemplateRows: 'repeat(2, minmax(0, 1fr))' },
      3: { gridTemplateRows: 'repeat(3, minmax(0, 1fr))' },
      4: { gridTemplateRows: 'repeat(4, minmax(0, 1fr))' },
      5: { gridTemplateRows: 'repeat(5, minmax(0, 1fr))' },
      6: { gridTemplateRows: 'repeat(6, minmax(0, 1fr))' },
      none: { gridTemplateRows: 'none' },
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
    },

    colGap: {
      1: { columnGap: '$1' },
      2: { columnGap: '$2' },
      3: { columnGap: '$3' },
      4: { columnGap: '$4' },
      5: { columnGap: '$5' },
      6: { columnGap: '$6' },
      7: { columnGap: '$7' },
      8: { columnGap: '$8' },
      9: { columnGap: '$9' },
    },

    rowGap: {
      1: { rowGap: '$1' },
      2: { rowGap: '$2' },
      3: { rowGap: '$3' },
      4: { rowGap: '$4' },
      5: { rowGap: '$5' },
      6: { rowGap: '$6' },
      7: { rowGap: '$7' },
      8: { rowGap: '$8' },
      9: { rowGap: '$9' },
    },

    spacing: {
      none: {},
      xxs: { '& > *': { px: '$2', py: '$1' } },
      xs: { '& > *': { px: '$2', py: '$2' } },
      sm: { '& > *': { px: '$2', py: '$3' } },
      md: { '& > *': { px: '$2', py: '$4' } },
    },
  },
});

type StyledGridProps = ComponentProps<typeof StyledGrid>;

type RootProps = {
  /**
   * The number of columns in the grid.
   */
  cols?: StyledGridProps['cols'];
  /**
   * The number of rows in the grid.
   */
  rows?: StyledGridProps['rows'];
  /**
   * The gap between cells.
   */
  gap?: StyledGridProps['gap'];
  /**
   * The gap between columns when vertical and horizontal gaps are different.
   */
  colGap?: StyledGridProps['colGap'];
  /**
   * The gap between rows when vertical and horizontal gaps are different.
   */
  rowGap?: StyledGridProps['rowGap'];
  /**
   * The spacing inside each cell.
   */
  spacing?: StyledGridProps['spacing'];
  /**
   * The grid contents, usually `Grid.Cell` components.
   */
  children?: ReactNode;
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
};

const Root = forwardRef<ElementRef<'div'>, RootProps>(function Grid({ spacing = 'xs', ...props }, ref) {
  return <StyledGrid spacing={spacing} {...props} ref={ref} />;
});

export const Grid = Object.assign(Root, {
  Cell,
});
