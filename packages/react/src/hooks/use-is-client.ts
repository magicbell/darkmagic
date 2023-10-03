import * as React from 'react';

export function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(typeof document !== 'undefined'), []);
  return isClient;
}
