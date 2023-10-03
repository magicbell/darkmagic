import * as React from 'react';

export function useFormReset(cb: () => void, elem: HTMLElement | null) {
  const callback = React.useRef(cb);
  callback.current = cb;

  React.useEffect(() => {
    if (!elem) return;
    const form = elem.closest('form');
    if (!form) return;

    const fn = () => callback.current();
    form.addEventListener('reset', fn);
    return () => form.removeEventListener('reset', fn);
  }, [elem, callback]);
}
