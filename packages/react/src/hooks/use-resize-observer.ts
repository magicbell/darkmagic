import { useEffect, useRef, useState } from 'react';

export function useResizeObserver(cb: (size: ResizeObserverSize) => void) {
  const [targetRef, setTargetRef] = useState(null);

  const callback = useRef(cb);
  callback.current = cb;

  useEffect(() => {
    if (!targetRef) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          // Firefox implements `contentBoxSize` as a single content rect, rather than an array
          const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;

          window.requestAnimationFrame(() => {
            callback.current?.(contentBoxSize);
          });
        }
      }
    });

    observer.observe(targetRef);
    return () => observer.disconnect();
  }, [targetRef]);

  return setTargetRef;
}
