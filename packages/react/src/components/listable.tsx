import { Slot } from '@radix-ui/react-slot';
import { cloneElement, createContext, ElementRef, forwardRef, ReactNode, useContext, useMemo } from 'react';
import { isElement } from 'react-is';

import { ComponentProps, styled } from '../lib/stitches';

type StyledCellProps = ComponentProps<typeof StyledCell>;

const divider = {
  display: 'block',
  content: '""',
  position: 'absolute',
  top: '$$spacing',
  bottom: '$$spacing',
  width: '1px',
  backgroundColor: '$border-muted',
};

const StyledCell = styled('div', {
  fontWeight: 'unset',
  textAlign: 'start',

  font: '$body-small',
  color: '$text-default',

  display: 'flex',
  alignItems: 'center',
  flex: 'none',

  position: 'relative',

  defaultVariants: {
    truncate: false,
  },

  variants: {
    muted: {
      true: {
        color: '$text-muted',
      },
    },

    truncate: {
      true: {
        '&, & [data-listable-cell-content]': {
          truncate: true,
        },
      },
    },

    divide: {
      before: {
        '&::before': {
          ...divider,
          left: 0,
        },
      },

      after: {
        '&&::after': {
          ...divider,
          right: '-1px',
        },
      },
    },

    width: {
      xs: { width: '$30' },
      sm: { width: '$50' },
      md: { width: '$70' },
      lg: { width: '$90' },
      min: { width: 'min-content' },
      max: { width: 'max-content' },
      auto: { width: 'auto' },
      full: { minWidth: 1, flex: '1 1 auto' },
    },
  },
});

export type ListableCellProps = {
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied
   * element/component and change the underlying DOM node.
   */
  asChild?: boolean;
  /**
   * If the only child is a single element, this will pad the child instead of
   * the cell. This is useful for when the child is a button or link, so that
   * the element covers the entire cell, increasing the click region.
   */
  padOnlyChild?: boolean;
  /**
   * Muted cells are used to indicate that the content is not important.
   */
  muted?: StyledCellProps['muted'];
  /**
   * Truncate the content of the cell with an ellipsis.
   */
  truncate?: StyledCellProps['truncate'];
  /**
   * Width of the cell. Fluent widths should be preferred over absolute widths.
   */
  width?: StyledCellProps['width'];

  children?: StyledCellProps['children'];
  divide?: StyledCellProps['divide'];
};

const Cell = forwardRef<ElementRef<typeof StyledCell>, ListableCellProps>(function Cell(
  { asChild, padOnlyChild = false, truncate = false, children, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'div';

  const movePadding = padOnlyChild && isElement(children);

  return (
    <StyledCell
      as={Comp}
      data-listable-cell={true}
      data-listable-cell-content={movePadding ? undefined : true}
      truncate={truncate}
      {...props}
      ref={ref}
    >
      {movePadding
        ? cloneElement(
            children,
            // when we render a Slot, we need to move the padding to the child of the child,
            // as the Slot promotes the first child to the new root.
            asChild
              ? {
                  ...children.props,
                  children: cloneElement(children.props.children, {
                    'data-listable-cell-content': true,
                    ...children.props.children.props,
                  }),
                }
              : {
                  'data-listable-cell-content': true,
                  ...children.props,
                },
          )
        : children}
    </StyledCell>
  );
});

type StyledItemProps = ComponentProps<typeof StyledItem>;

const StyledItem = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',

  '& [data-listable-cell]': {
    transition: 'background-color .15s ease, border .15s ease',
  },

  '& [data-listable-cell-content]': {
    px: '$2',
  },

  defaultVariants: {
    interactive: true,
    variant: 'default',
  },

  variants: {
    interactive: {
      true: {
        [`&:not(:first-child) [data-listable-cell]`]: {
          borderTop: '1px solid $border-muted',
        },

        [`&:hover [data-listable-cell]`]: {
          backgroundColor: '$bg-hover',
        },

        [`&[data-selected] [data-listable-cell]`]: {
          backgroundColor: '$bg-active',
        },
      },
    },

    spacing: {
      none: {
        $$spacing: 0,
        [`& [data-listable-cell-content]`]: { py: 0 },
        [`&&& [data-listable-cell]`]: { border: 'none' },
      },
      xxs: {
        $$spacing: '$space$1',
        [`& [data-listable-cell-content]`]: { py: '$1' },
        [`&&& [data-listable-cell]`]: { border: 'none' },
      },
      xs: { $$spacing: '$space$2', [`& [data-listable-cell-content]`]: { py: '$2' } },
      sm: { $$spacing: '$space$3', [`& [data-listable-cell-content]`]: { py: '$3' } },
      md: { $$spacing: '$space$4', [`& [data-listable-cell-content]`]: { py: '$4' } },
    },

    variant: {
      default: {},
      contained: {
        // add extra outer padding
        [`& > [data-listable-cell-content]:first-child`]: { pl: '$4' },
        [`& > [data-listable-cell-content]:last-child`]: { pr: '$4' },

        // outer rounded border - top
        [`&:first-child [data-listable-cell]`]: { borderTop: '1px solid $border-muted' },
        [`&:first-child [data-listable-cell]:first-child`]: { borderTopLeftRadius: '$base' },
        [`&:first-child [data-listable-cell]:last-child`]: { borderTopRightRadius: '$base' },
        [`&:last-child [data-listable-cell]`]: { borderBottom: '1px solid $border-muted' },
        [`&:last-child [data-listable-cell]:first-child`]: { borderBottomLeftRadius: '$base' },
        [`&:last-child [data-listable-cell]:last-child`]: { borderBottomRightRadius: '$base' },
        [`& [data-listable-cell]:first-child`]: { borderLeft: '1px solid $border-muted' },
        [`& [data-listable-cell]:last-child`]: { borderRight: '1px solid $border-muted' },
      },
    },
  },

  compoundVariants: [
    {
      // Setting interactive to false will render the item without the hover and selected styles,
      // as well as borders. Interactive false is meant to be used for the header row in a table.
      interactive: true,
      variant: 'default',
      css: {
        [`&:first-child [data-listable-cell]`]: {
          borderTop: '1px solid $border-muted',
        },

        [`&:hover [data-listable-cell]:first-child, &[data-selected] [data-listable-cell]:first-child`]: {
          borderTopLeftRadius: '$base',
          borderBottomLeftRadius: '$base',
        },

        [`&:hover [data-listable-cell]:last-child, &[data-selected] [data-listable-cell]:last-child`]: {
          borderTopRightRadius: '$base',
          borderBottomRightRadius: '$base',
        },

        [`&:hover [data-listable-cell], &[data-selected] [data-listable-cell]`]: {
          borderTopColor: 'transparent !important',
          borderBottomColor: 'transparent !important',
        },

        [`&:hover + * [data-listable-cell], &[data-selected] + * [data-listable-cell]`]: {
          borderTopColor: 'transparent !important',
        },
      },
    },
    {
      // Setting interactive to false will render the item without the hover and selected styles.
      interactive: true,
      variant: 'contained',
      css: {
        // item borders on hover & select
        [`&:hover:not(:first-child) [data-listable-cell], &[data-selected]:not(:first-child) [data-listable-cell]`]: {
          borderTopColor: 'transparent !important',
        },

        [`&:hover:not(:last-child) [data-listable-cell], &[data-selected]:not(:last-child) [data-listable-cell]`]: {
          borderBottomColor: 'transparent !important',
        },

        [`&:hover + * [data-listable-cell], &[data-selected] + * [data-listable-cell]`]: {
          borderTopColor: 'transparent !important',
        },
      },
    },
  ],
});

type ItemProps = {
  /**
   * Whether the item is interactive or not. If interactive, the item will have
   * hover and selected styles.
   */
  interactive?: StyledItemProps['interactive'];
  /**
   * Spacing is the amount of vertical padding applied to the items cells. This
   * setting defaults to the value provided to the Listable component.
   */
  spacing?: StyledItemProps['spacing'];
  /**
   * The variant of the item. This setting defaults to the value provided to the
   * Listable component, and is unlikely to be provided directly to the item.
   */
  variant?: StyledItemProps['variant'];
  /**
   * Selected elements are rendered with a highlighted background color.
   */
  selected?: boolean;
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied
   * element/component and change the underlying DOM node.
   */
  asChild?: boolean;
} & StyledItemProps;

const Item = forwardRef<ElementRef<typeof StyledItem>, ItemProps>(function Item(
  { asChild, selected = false, ...props },
  ref,
) {
  const context = useContext(ListableContext);
  const Comp = asChild ? Slot : 'div';

  return (
    <StyledItem
      as={Comp}
      data-selected={selected || undefined}
      aria-selected={selected || undefined}
      {...context}
      {...props}
      ref={ref}
    />
  );
});

type RootProps = {
  /**
   * The spacing between items in the list. Spacing is controlled by applying
   * padding to individual cells. Note that `spacing: xxs` disables borders.
   */
  spacing?: StyledItemProps['spacing'];
  /**
   * The style of the list, default shows a divided list with horizontal borders,
   * while contained lists have an outer border and rounded corners.
   */
  variant?: StyledItemProps['variant'];
  /**
   * Change the component to the HTML tag or custom component of the only child.
   * This will merge the original component props with the props of the supplied
   * element/component and change the underlying DOM node.
   */
  asChild?: boolean;
  /**
   * The children of the list, usually a collection of Listable.Item components.
   */
  children?: ReactNode;
};

const ListableContext = createContext<Pick<RootProps, 'spacing' | 'variant'>>({
  spacing: 'sm',
  variant: 'default',
});

const Root = forwardRef<ElementRef<'div'>, RootProps>(function Listable(
  { asChild, spacing = 'sm', variant = 'default', ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  const context = useMemo(() => ({ spacing, variant }), [spacing, variant]);

  return (
    <ListableContext.Provider value={context}>
      <Comp {...props} ref={ref} />
    </ListableContext.Provider>
  );
});

/**
 * The Listable component is a container for a list of items. It provides a context
 * for the items to consume, and handles the spacing and variant styles. The Listable
 * is unlikely to be used directly, but rather as a base for other components such
 * as List and Table.
 */
export const Listable = Object.assign(Root, {
  /**
   * The Listable.Item component is a container for a single item in a list. To
   * maximize flexibility, it applies borders and spacing to its cells rather
   * than to itself. This allows the item to be used in a variety of contexts,
   * such as a table or a list.
   */
  Item: Item,
  /**
   * The Listable.Cell component is a container for a single cell in a list item.
   * It's the smallest unit of the Listable component. While it's the row that
   * controls the amount of padding the cell has, the cell is responsible for
   * deciding if that padding is applied to the cell itself, or the first (and only)
   * child.
   */
  Cell: Cell,
});
