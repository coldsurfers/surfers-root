import type { z } from 'zod';

type CreateZodFuncParam = Record<
  string,
  {
    name: string;
    params: z.AnyZodObject;
  }
>;

export function createZodNavigation<T extends CreateZodFuncParam>(params: T) {
  return params;
}

export function createZodScreen<T extends CreateZodFuncParam>(params: T): Readonly<T> {
  return params;
}
