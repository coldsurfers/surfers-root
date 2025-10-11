import { AppLocaleSchema } from 'app/blog/(types)/i18n';
import { OfficialBlogSeriesCategorySchema, SeriesCategorySchema } from 'app/blog/(types)/series';
import { z } from 'zod';

export const FetchGetSeriesItemSearchParamsSchema = z.discriminatedUnion('isOfficialBlog', [
  z.object({
    seriesCategory: SeriesCategorySchema,
    appLocale: AppLocaleSchema,
    isOfficialBlog: z.literal(false),
  }),
  z.object({
    seriesCategory: OfficialBlogSeriesCategorySchema,
    appLocale: AppLocaleSchema,
    isOfficialBlog: z.literal(true),
  }),
]);
export type FetchGetSeriesItemSearchParams = z.infer<typeof FetchGetSeriesItemSearchParamsSchema>;
