import { z } from 'zod'
import { AppLocaleSchema } from './i18n'

export const SeriesSchema = z.union([z.literal('YMWT'), z.literal('YMRT'), z.literal('YMLT')])
export type Series = z.infer<typeof SeriesSchema>

export const SeriesItemSchema = z.object({
  id: z.string(),
  createdTime: z.date(),
  lastEditedTime: z.date(),
  dateLocale: z.string(),
  slug: z.string(),
  title: z.string(),
  status: z.string(),
  writer: z.string(),
  lang: AppLocaleSchema,
  series: SeriesSchema,
  thumbnailUrl: z.string().nullable(),
})
export type SeriesItem = z.infer<typeof SeriesItemSchema>
