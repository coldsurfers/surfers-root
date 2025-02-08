import { AppLocaleSchema } from '@/lib/types/i18n'
import { SeriesCategorySchema } from '@/lib/types/series'
import { z } from 'zod'

export const FetchGetSeriesItemSearchParamsSchema = z.object({
  seriesCategory: SeriesCategorySchema,
  appLocale: AppLocaleSchema,
})
export type FetchGetSeriesItemSearchParams = z.infer<typeof FetchGetSeriesItemSearchParamsSchema>
