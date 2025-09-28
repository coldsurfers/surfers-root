import { tryParse } from '@coldsurfers/shared-utils';

export type SessionStorageItem =
  | '@coldsurf-io/prev-path'
  | '@coldsurf-io/current-path'
  | '@coldsurf-io/auth-redirect-path'
  | '@coldsurf-io/user-voice-contact'
  | '@coldsurf-io/user-voice-message';

export const appSessionStorage =
  typeof window !== 'undefined'
    ? {
        set(item: SessionStorageItem, value: string) {
          sessionStorage.setItem(item, value);
        },
        get<ParsedValueT>(item: SessionStorageItem) {
          const value = sessionStorage.getItem(item);
          try {
            if (!value) return null;
            const parsed = tryParse(value, { fallback: value }) as ParsedValueT;
            return parsed;
          } catch (e) {
            console.error(e);
            return value as ParsedValueT;
          }
        },
        remove(item: SessionStorageItem) {
          sessionStorage.removeItem(item);
        },
        clear() {
          sessionStorage.clear();
        },
      }
    : null;
