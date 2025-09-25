import { tryParse } from '@coldsurfers/shared-utils';
import { useLocalStorage as useLocalStorageHook } from '@uidotdev/usehooks';

export type StorageItem =
  | '@coldsurf-io/access-token'
  | '@coldsurf-io/refresh-token'
  | '@coldsurf-io/theme'
  | '@coldsurf-io/survey-completed';

const storage =
  typeof window !== 'undefined'
    ? {
        set(item: StorageItem, value: string) {
          localStorage.setItem(item, value);
        },
        get<ParsedValueT>(item: StorageItem) {
          const value = localStorage.getItem(item);
          try {
            if (!value) return null;
            const parsed = tryParse(value, { fallback: value }) as ParsedValueT;
            return parsed;
          } catch (e) {
            console.error(e);
            return value as ParsedValueT;
          }
        },
        remove(item: StorageItem) {
          localStorage.removeItem(item);
        },
        clear() {
          localStorage.clear();
        },
      }
    : null;

export default storage;

export const useLocalStorage = <T>(key: StorageItem) => {
  return useLocalStorageHook<T>(key, undefined);
};
