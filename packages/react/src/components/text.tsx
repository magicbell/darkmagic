import { ElementRef, forwardRef, ReactNode } from 'react';

import { Flex } from './flex';
import { Typography } from './typography';

type TextProps = {
  primary?: ReactNode;
  secondary?: ReactNode;
  bold?: boolean;
  highlight?: boolean;
  reverse?: boolean;
};

export const Text = forwardRef<ElementRef<typeof Flex>, TextProps>(function Text(
  { primary, secondary, bold, highlight, reverse, ...props },
  ref,
) {
  const primaryNode = (
    <Typography variant={bold ? 'bold' : 'small'} color={highlight ? 'highlight' : 'default'} truncate>
      {primary == null ? secondary : primary}
    </Typography>
  );

  const secondaryNode = (
    <Typography variant="small" color="muted" truncate>
      {primary != null ? secondary : null}
    </Typography>
  );

  return (
    <Flex direction="column" overflow="hidden" {...props} ref={ref}>
      {reverse ? (
        <>
          {secondaryNode}
          {primaryNode}
        </>
      ) : (
        <>
          {primaryNode}
          {secondaryNode}
        </>
      )}
    </Flex>
  );
});
