import * as React from 'react';

export function useMaybeControlled<T>(
  defaultValue: T | undefined,
  value: T | undefined,
  onChange?: (value: T) => void,
) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = typeof value !== 'undefined';

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const handleChange = React.useCallback(
    (value: T) => {
      onChangeRef.current?.(value);
      if (!isControlled) {
        setInternalValue(value);
      }
    },
    [onChangeRef, setInternalValue, isControlled],
  );

  const reset = React.useCallback(() => {
    setInternalValue(defaultValue);
  }, [setInternalValue, defaultValue]);

  return [value ?? internalValue, handleChange, reset] as const;
}
