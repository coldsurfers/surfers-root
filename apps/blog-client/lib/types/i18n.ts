import { z } from 'zod'

export const AppLocaleSchema = z.union([z.literal('en'), z.literal('ko')])
export type AppLocale = z.infer<typeof AppLocaleSchema>
