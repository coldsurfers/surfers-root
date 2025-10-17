import { z } from 'zod';

export const SearchDTOSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('artist'),
    name: z.string(),
    profileImgUrl: z.string(),
    id: z.string(),
  }),
  z.object({
    type: z.literal('venue'),
    name: z.string(),
    id: z.string(),
    slug: z.string().nullable(),
  }),
  z.object({
    type: z.literal('concert'),
    title: z.string(),
    thumbnailImgUrl: z.string(),
    // 실제 값은 2025-10-18T09:00:00+00:00 과 같은 값 -> coerce date로 변환하면 2025-10-18T09:00:00Z 로 변환됨
    // strict하게 z.string().datetime()으로 하면 zodError
    date: z.coerce.date(),
    venueTitle: z.string(),
    id: z.string(),
    slug: z.string().nullable(),
    locationCityId: z.string(),
  }),
]);
export type SearchDTO = z.infer<typeof SearchDTOSchema>;

export const SearchListQueryStringDTOSchema = z.object({
  keyword: z.string(),
});
export type SearchListQueryStringDTO = z.infer<typeof SearchListQueryStringDTOSchema>;
