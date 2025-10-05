import { z } from 'zod';

export const AppLocaleSchema = z.enum(['ko', 'en']);
export type AppLocale = z.infer<typeof AppLocaleSchema>;
