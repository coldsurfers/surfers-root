import { AppLocaleSchema } from '@/lib/types/i18n'
import { SeriesCategorySchema } from '@/lib/types/series'
import { z } from 'zod'

export const FetchGetSeriesSearchParamsSchema = z.object({
  seriesCategory: SeriesCategorySchema,
  appLocale: AppLocaleSchema,
  tag: z.string().optional(),
})
export type FetchGetSeriesSearchParams = z.infer<typeof FetchGetSeriesSearchParamsSchema>
