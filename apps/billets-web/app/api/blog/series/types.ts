import { AppLocaleSchema } from 'app/blog/(types)/i18n'
import { SeriesCategorySchema } from 'app/blog/(types)/series'
import { z } from 'zod'

export const FetchGetSeriesSearchParamsSchema = z.object({
  seriesCategory: SeriesCategorySchema,
  appLocale: AppLocaleSchema,
  tag: z.string().optional(),
})
export type FetchGetSeriesSearchParams = z.infer<typeof FetchGetSeriesSearchParamsSchema>
