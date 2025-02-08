import { z } from 'zod'
import { AppLocaleSchema } from './i18n'

export const SeriesSchema = z.union([z.literal('YMWT'), z.literal('YMRT'), z.literal('YMLT'), z.literal('YMCT')])
export type Series = z.infer<typeof SeriesSchema>

export const SeriesItemSchema = z.object({
  id: z.string(),
  createdTime: z.string(),
  lastEditedTime: z.string(),
  dateLocale: z.string(),
  slug: z.string(),
  title: z.any().array(), // RichTextItemResponse[]
  status: z.string(),
  writer: z.object({}), // PartialUserObjectResponse
  lang: AppLocaleSchema,
  series: SeriesSchema,
  thumbnailUrl: z.string().nullable(),
})
export type SeriesItem = z.infer<typeof SeriesItemSchema>
