import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { styled } from '../lib/stitches.js';

const StyledGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: '$bg-default',
  borderRadius: '$base',

  defaultVariants: {
    size: 'md',
  },

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    size: {
      sm: {
        height: '$8',
      },
      md: {
        height: '$10',
      },
    },
  },
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$bg-default',
  color: '$text-muted',
  display: 'flex',
  font: '$body-small-bold',
  alignItems: 'center',
  justifyContent: 'center',
  '&:first-child': { borderLeftRadius: '$base' },
  '&:last-child': { borderRightRadius: '$base' },
  '&:hover': { backgroundColor: '$bg-hover' },
  '&:focus': { backgroundColor: '$bg-active' },
  '&[data-state=on]': { backgroundColor: '$primary-bg', color: '$text-default' },
  '&[data-state=on]:hover': { backgroundColor: '$primary-bg-hover' },
  '&[data-state=on]:focus': { backgroundColor: '$primary-bg-active' },

  defaultVariants: {
    width: 'hug',
  },

  variants: {
    width: {
      '3xs': { width: '$10', flex: '1 1 0px' },
      hug: { width: 'unset', padding: '0 $2', flex: '1 1 auto' },
    },
  },
});

export const ToggleGroup = Object.assign(StyledGroup, {
  Item: StyledItem,
});
