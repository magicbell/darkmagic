import * as React from 'react';

import { Flex, FlexProps } from './flex.js';

export function Stack(props: FlexProps) {
  return <Flex {...props} direction="column" />;
}
