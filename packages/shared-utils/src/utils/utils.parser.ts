export interface TryParseOptions<T> {
  fallback?: T;
  silent?: boolean;
}

export function tryParse<T = any>(
  jsonString: string,
  { silent = true, fallback }: TryParseOptions<T> = {}
): T | undefined {
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    if (!silent) {
      console.warn('JSON parse error, return fallback:', e, '| input:', jsonString);
    }

    return fallback;
  }
}
