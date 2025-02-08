import { AppLocaleSchema } from '@/lib/types/i18n'
import { SeriesSchema } from '@/lib/types/series'
import { z } from 'zod'

export const FetchGetSeriesSearchParamsSchema = z.object({
  series: SeriesSchema,
  appLocale: AppLocaleSchema,
  tag: z.string().optional(),
})
export type FetchGetSeriesSearchParams = z.infer<typeof FetchGetSeriesSearchParamsSchema>
