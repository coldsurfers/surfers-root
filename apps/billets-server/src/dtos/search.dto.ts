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
    date: z.string().datetime(),
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
