import { AppLocaleSchema } from 'app/blog/(types)/i18n'
import { SeriesCategorySchema } from 'app/blog/(types)/series'
import { z } from 'zod'

export const FetchGetSeriesItemSearchParamsSchema = z.object({
  seriesCategory: SeriesCategorySchema,
  appLocale: AppLocaleSchema,
})
export type FetchGetSeriesItemSearchParams = z.infer<typeof FetchGetSeriesItemSearchParamsSchema>
