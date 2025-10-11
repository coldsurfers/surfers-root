import { AppLocaleSchema } from 'app/blog/(types)/i18n';
import { OfficialBlogSeriesCategorySchema, SeriesCategorySchema } from 'app/blog/(types)/series';
import { z } from 'zod';

export const FetchGetSeriesSearchParamsSchema = z.discriminatedUnion('isOfficialBlog', [
  z.object({
    seriesCategory: SeriesCategorySchema,
    appLocale: AppLocaleSchema,
    tag: z.string().optional(),
    isOfficialBlog: z.literal(false),
  }),
  z.object({
    seriesCategory: OfficialBlogSeriesCategorySchema,
    appLocale: AppLocaleSchema,
    tag: z.string().optional(),
    isOfficialBlog: z.literal(true),
  }),
]);
export type FetchGetSeriesSearchParams = z.infer<typeof FetchGetSeriesSearchParamsSchema>;
