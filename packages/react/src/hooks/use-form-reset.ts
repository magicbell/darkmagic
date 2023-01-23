import { useEffect, useRef } from 'react';

export function useFormReset(cb: () => void, elem: HTMLElement | null) {
  const callback = useRef(cb);
  callback.current = cb;

  useEffect(() => {
    if (!elem) return;
    const form = elem.closest('form');
    if (!form) return;

    const fn = () => callback.current();
    form.addEventListener('reset', fn);
    return () => form.removeEventListener('reset', fn);
  }, [elem, callback]);
}
