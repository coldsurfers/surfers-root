import { tryParse } from '@coldsurfers/shared-utils';
import { useCallback, useMemo } from 'react';

type SessionStorageItem = '@coldsurf-io/prev-path' | '@coldsurf-io/current-path';

export const useSessionStorage = () => {
  const setValue = useCallback((item: SessionStorageItem, value: string) => {
    sessionStorage.setItem(item, value);
  }, []);
  const getValue = useCallback(<T>(item: SessionStorageItem) => {
    const value = sessionStorage.getItem(item);
    try {
      if (!value) {
        return null;
      }
      const parsedValue = tryParse(value, {
        silent: true,
        fallback: value,
      });
      return parsedValue as T;
    } catch {
      return value as T;
    }
  }, []);

  return {
    setValue,
    getValue,
  };
};
