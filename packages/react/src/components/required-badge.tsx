import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ElementRef, forwardRef } from 'react';

import { ComponentProps, styled } from '../lib/stitches';

const StyledBadge = styled('span', {
  font: '$caption',
  color: '$text-error',
});

export const RequiredBadge = forwardRef<ElementRef<typeof StyledBadge>, ComponentProps<typeof StyledBadge>>(
  function RequiredBadge(props, ref) {
    return (
      <StyledBadge {...props} ref={ref}>
        <VisuallyHidden>required</VisuallyHidden>*
      </StyledBadge>
    );
  },
);
