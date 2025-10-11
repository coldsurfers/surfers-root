import { z } from 'zod';
import { AppLocaleSchema } from './i18n';

export const SeriesCategorySchema = z.union([
  z.literal('catholic'),
  z.literal('video'),
  z.literal('text'),
  z.literal('sound'),
  z.literal('tech'),
]);
export type SeriesCategory = z.infer<typeof SeriesCategorySchema>;

export const OfficialBlogSeriesCategorySchema = z.union([z.literal('news')]);
export type OfficialBlogSeriesCategory = z.infer<typeof OfficialBlogSeriesCategorySchema>;

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
  seriesCategory: z.union([SeriesCategorySchema, OfficialBlogSeriesCategorySchema]),
  thumbnailUrl: z.string().nullable(),
});
export type SeriesItem = z.infer<typeof SeriesItemSchema>;
