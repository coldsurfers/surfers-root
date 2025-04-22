import { z } from 'zod'

export const AppLocaleSchema = z.literal('ko')
export type AppLocale = z.infer<typeof AppLocaleSchema>
