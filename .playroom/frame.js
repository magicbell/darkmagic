import React, { useLayoutEffect } from 'react';
import { globalStyles, globalCss, Tooltip } from '@darkmagic/react';

globalCss({
  // ':root': {
  //   background: '#23283B',
  // },
  //
  // '[data-testid="frameName"] > span': {
  //   color: '#EDEDEF',
  // }

  'iframe': {
    background: '#1B1D29',
    padding: 0,
  }
})();

export default function FrameComponent({ theme, children }) {
  useLayoutEffect(() => {
    globalStyles()
  }, []);

  return <Tooltip.Provider>{children}</Tooltip.Provider>;
}
