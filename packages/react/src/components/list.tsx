import { ElementRef, forwardRef } from 'react';

import { ComponentProps, CSS, styled } from '../lib/stitches';
import { Listable } from './listable';

type ItemProps = ComponentProps<typeof Listable>;

const Item = forwardRef<ElementRef<'li'>, ItemProps>(function Item({ children, ...props }, ref) {
  return (
    <Listable.Item asChild {...props}>
      <li ref={ref}>{children}</li>
    </Listable.Item>
  );
});

const StyledList = styled('ul', {
  all: 'unset',
  margin: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  width: '100%',
  listStyle: 'none',
});

type StyledListProps = ComponentProps<typeof StyledList>;

type RootProps = {
  /**
   * Set to `true` to render the list as a `ol` element, otherwise it will be
   * rendered as an `ul`.
   */
  ordered?: boolean;
  /**
   * Easily override styles. It’s like the style attribute, but it supports
   * tokens, media queries, nesting and token-aware values.
   */
  css?: CSS;
} & StyledListProps &
  ComponentProps<typeof Listable>;

const Root = forwardRef<ElementRef<'ol' | 'ul'>, RootProps>(function List(
  { spacing = 'sm', variant = 'default', ordered, children, ...props },
  ref,
) {
  return (
    <Listable asChild variant={variant} spacing={spacing}>
      <StyledList as={ordered ? 'ol' : 'ul'} {...props} ref={ref as any}>
        {children}
      </StyledList>
    </Listable>
  );
});

export const List = Object.assign(Root, {
  Item,
  Cell: Listable.Cell,
});
