import { useState, useCallback } from 'react';

export default function useBoolean(initialValue: boolean) {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggle = useCallback(() => setValue(current => !current), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return {
    value,
    setValue,
    toggle,
    setTrue,
    setFalse,
  };
}
