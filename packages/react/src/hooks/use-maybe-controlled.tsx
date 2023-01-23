import { useCallback, useRef, useState } from 'react';

export function useMaybeControlled<T>(
  defaultValue: T | undefined,
  value: T | undefined,
  onChange?: (value: T) => void,
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = typeof value !== 'undefined';

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const handleChange = useCallback(
    (value: T) => {
      onChangeRef.current?.(value);
      if (!isControlled) {
        setInternalValue(value);
      }
    },
    [onChangeRef, setInternalValue, isControlled],
  );

  const reset = useCallback(() => {
    setInternalValue(defaultValue);
  }, [setInternalValue, defaultValue]);

  return [value ?? internalValue, handleChange, reset] as const;
}
