import { useEffect, useRef } from 'react';

export function useResizeObserver(cb: (size: ResizeObserverSize) => void, target: HTMLElement | null) {
  const callback = useRef(cb);
  callback.current = cb;

  useEffect(() => {
    if (!target) return;

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

    observer.observe(target);
    return () => observer.disconnect();
  }, [callback, target]);
}
