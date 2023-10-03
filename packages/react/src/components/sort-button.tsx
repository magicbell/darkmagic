import { ArrowDownIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { ComponentProps, styled } from '../lib/stitches.js';

const StyledSortIcon = styled('span', {
  display: 'inline',
  flex: 'none',
  transition: 'transform 0.2s ease',

  variants: {
    direction: {
      asc: { transform: 'scaleY(-1)' },
      desc: {},
    },
  },
});

type StyledSortIconProps = ComponentProps<typeof StyledSortIcon>;

type StyledSortButtonProps = ComponentProps<typeof StyledSortButton>;
const StyledSortButton = styled('button', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': { boxSizing: 'border-box' },
  '&::after': { boxSizing: 'border-box' },

  // Custom reset
  font: '$body-small-bold',
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'start',
  alignItems: 'center',
  lineHeight: '$normal',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  textAlign: 'left',
  minWidth: 'max-content',

  '&:hover, &:focus-visible, &[data-active]': {
    color: '$text-default',
  },
});

type SortButtonProps = {
  children?: React.ReactNode;
  direction?: StyledSortIconProps['direction'];
  onClick?: StyledSortButtonProps['onClick'];
  name?: string;
  onChangeDirection?: (direction: SortDirection) => void;
};

export type SortDirection = 'asc' | 'desc';

export const SortButton = React.forwardRef<React.ElementRef<typeof StyledSortButton>, SortButtonProps>(
  function SortButton({ direction, children, onClick, onChangeDirection, ...props }, ref) {
    const handleChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      onClick?.(event);
      const newDirection = direction ? (direction === 'asc' ? 'desc' : 'asc') : 'desc';
      onChangeDirection?.(newDirection);
    };

    return (
      <StyledSortButton
        type="button"
        onClick={handleChange}
        {...props}
        data-active={direction ? true : undefined}
        ref={ref}
      >
        <div>{children}</div>

        <StyledSortIcon direction={direction}>
          <ArrowDownIcon />
        </StyledSortIcon>
      </StyledSortButton>
    );
  },
);
