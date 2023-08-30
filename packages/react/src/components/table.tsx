import { Children, cloneElement, ElementRef, forwardRef } from 'react';
import { isElement } from 'react-is';
import invariant from 'tiny-invariant';

import { ComponentProps, CSS, styled } from '../lib/stitches';
import { Listable, ListableCellProps } from './listable';

const StyledHead = styled('thead', {});

type HeadProps = ComponentProps<typeof StyledHead>;
const Head = forwardRef<ElementRef<typeof StyledHead>, HeadProps>(function Head({ children, ...props }, ref) {
  return (
    <StyledHead {...props} ref={ref}>
      {Children.map(children, (rowElem) =>
        isElement(rowElem)
          ? cloneElement(rowElem, {
              spacing: 'xs',
              interactive: false,
              ...rowElem.props,
              children: Children.map(rowElem.props.children, (cellElem) =>
                isElement(cellElem) ? <HeaderCell {...cellElem.props} /> : cellElem,
              ),
            })
          : rowElem,
      )}
    </StyledHead>
  );
});

const StyledBody = styled('tbody', {});

type BodyProps = ComponentProps<typeof StyledBody>;
const Body = forwardRef<ElementRef<typeof StyledBody>, BodyProps>(function Body(props, ref) {
  return <StyledBody {...props} ref={ref} />;
});

const StyledRow = styled('tr', {
  '&&': {
    display: 'table-row',
  },
});

type RowProps = ComponentProps<typeof Listable.Item>;
const Row = forwardRef<ElementRef<'tr'>, RowProps>(function Row({ children, ...props }, ref) {
  return (
    <Listable.Item asChild {...props}>
      <StyledRow ref={ref}>{children}</StyledRow>
    </Listable.Item>
  );
});

const StyledTH = styled('th', {
  // use double ampersand to increase specificity
  '&&': {
    display: 'table-cell',
    font: '$body-small-bold',
    color: '$text-muted',
  },
});

/**
 * HeaderCell is an "internal" component, the public Table only exposes Cell.
 * Header maps Cells to HeaderCell.
 */
const HeaderCell = forwardRef<ElementRef<'th'>, StyledCellProps>(function HeaderCell({ children, ...props }, ref) {
  const hasSingleElementChild = Children.count(children) === 1 && isElement(children);

  return (
    <StyledCell asChild padOnlyChild={hasSingleElementChild} {...props} ref={ref}>
      <StyledTH>{children}</StyledTH>
    </StyledCell>
  );
});

const StyledCell = styled(Listable.Cell, {
  display: 'table-cell',
  flex: 'unset',
  width: '1px',

  '&& > a[data-listable-cell-content]': {
    display: 'block',
    height: '100%',
    width: '100%',
  },

  '&& > button[data-listable-cell-content]': {
    width: '100%',
  },

  variants: {
    width: {
      '4xs': { minWidth: '$10' },
      '3xs': { minWidth: '$14' },
      xxs: { minWidth: '$24' },
      xs: { minWidth: '$30' },
      sm: { minWidth: '$50' },
      md: { minWidth: '$70' },
      lg: { minWidth: '$90' },
      min: { width: '1px', whiteSpace: 'nowrap' },
      max: { width: '100%' },
      auto: { width: 'auto' },
    },
  },
});

type StyledCellProps = ComponentProps<typeof StyledCell>;

export type TableCellProps = {
  colSpan?: number;
  width?: StyledCellProps['width'];
} & Omit<ListableCellProps, 'width'>;

const Cell = forwardRef<ElementRef<'td'>, TableCellProps>(function Cell({ children, width, ...props }, ref) {
  return (
    // We need the cast, as TS doesn't see that StyledCell inherits Listable.Cell variants
    <StyledCell asChild width={width as StyledCellProps['width']} {...props}>
      <td ref={ref}>{children}</td>
    </StyledCell>
  );
});

const StyledTable = styled('table', {
  width: '100%',
});

type RootProps = {
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
} & ComponentProps<typeof StyledTable> &
  ComponentProps<typeof Listable>;

// TODO: contained with header has visual bug
const Root = forwardRef<ElementRef<'table'>, RootProps>(function Table(
  { spacing = 'sm', variant = 'default', children, ...props },
  ref,
) {
  const isContained = variant === 'contained';
  const hasHeader = Children.toArray(children).some((child) => isElement(child) && child?.type === Head);
  invariant(!(isContained && hasHeader), 'Table: contained variant is to be used without a header.');

  return (
    <Listable asChild variant={variant} spacing={spacing}>
      <StyledTable cellPadding={0} cellSpacing={0} {...props} ref={ref}>
        {children}
      </StyledTable>
    </Listable>
  );
});

export const Table = Object.assign(Root, {
  Head,
  Body,
  Row,
  Cell,
});
