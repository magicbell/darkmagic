import * as LabelPrimitive from '@radix-ui/react-label';

import { styled } from '../lib/stitches';

const StyledLabel = styled(LabelPrimitive.Root, {
  font: '$body-small',
  color: '$text-default',
  userSelect: 'none',
});

export const Label = StyledLabel;
