import Mousetrap, { ExtendedKeyboardEvent } from 'mousetrap';
import { useEffect, useRef } from 'react';

export type MousetrapAction = 'keypress' | 'keydown' | 'keyup';
export type MousetrapHandler = (event: ExtendedKeyboardEvent, combo: string) => void | boolean;

export function useMousetrap(
  key: string | string[],
  callback: MousetrapHandler,
  ref?: HTMLElement | null,
  action?: MousetrapAction,
) {
  const keyString = Array.isArray(key) ? key.join(',') : key;
  const cb = useRef(callback);
  cb.current = callback;

  useEffect(() => {
    // When ref === null, the ref was provided but the element isn't mounted (yet). Return early
    // so we don't mistakenly bind to the window.
    if (ref === null) return;

    const mousetrap = ref ? Mousetrap(ref) : Mousetrap;

    const fn: MousetrapHandler = (...args) => cb.current(...args);
    mousetrap.bind(key, fn, action);

    return () => {
      mousetrap.unbind(key, action);
    };

    // Ignore eslint, we flatten the key to a string to support unstable arrays
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyString, cb, ref, action]);
}

export default useMousetrap;
