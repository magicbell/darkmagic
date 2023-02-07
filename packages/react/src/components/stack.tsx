import { Flex, FlexProps } from './flex';

export function Stack(props: FlexProps) {
  return <Flex {...props} direction="column" />;
}
