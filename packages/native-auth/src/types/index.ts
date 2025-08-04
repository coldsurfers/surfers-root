import { z } from 'zod';

export const loginProviderSchema = z.union([
  z.literal('google'),
  z.literal('apple'),
  z.literal('email'),
]);
export type LoginProvider = z.infer<typeof loginProviderSchema>;
