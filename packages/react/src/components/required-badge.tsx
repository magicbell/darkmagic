import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import * as React from 'react';

import { ComponentProps, styled } from '../lib/stitches.js';

const StyledBadge = styled('span', {
  font: '$caption',
  color: '$text-error',
});

export const RequiredBadge = React.forwardRef<React.ElementRef<typeof StyledBadge>, ComponentProps<typeof StyledBadge>>(
  function RequiredBadge(props, ref) {
    return (
      <StyledBadge {...props} ref={ref}>
        <VisuallyHidden>required</VisuallyHidden>*
      </StyledBadge>
    );
  },
);
