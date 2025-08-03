import { z } from 'zod';

export const VenueDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  slug: z.string().nullable(),
});
export type VenueDTO = z.infer<typeof VenueDTOSchema>;

export const SubscribeVenueParamsDTOSchema = z.object({
  id: z.string(),
});
export type SubscribeVenueParamsDTO = z.infer<typeof SubscribeVenueParamsDTOSchema>;

export const GetVenueByIdParamsDTOSchema = z.object({
  id: z.string(),
});
export type GetVenueByIdParamsDTO = z.infer<typeof GetVenueByIdParamsDTOSchema>;

export const GetVenueBySlugDTOSchema = z.object({
  slug: z.string(),
});
export type GetVenueBySlugParamsDTO = z.infer<typeof GetVenueBySlugDTOSchema>;

export const GetConcertListByVenueIdParamsDTOSchema = z.object({
  venueId: z.string(),
});
export type GetConcertListByVenueIdParamsDTO = z.infer<
  typeof GetConcertListByVenueIdParamsDTOSchema
>;

export const GetConcertListByVenueIdQueryStringSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).max(100).default(20),
});
export type GetConcertListByVenueIdQueryString = z.infer<
  typeof GetConcertListByVenueIdQueryStringSchema
>;

export const GetVenuesByConcertIdParamsDTOSchema = z.object({
  concertId: z.string(),
});
export type GetVenuesByConcertIdParamsDTO = z.infer<typeof GetVenuesByConcertIdParamsDTOSchema>;

export const GetVenueDetailBySlugQuerystringDTOSchema = z.object({
  slug: z.string().optional(),
});
export type GetVenueDetailBySlugQuerystringDTO = z.infer<
  typeof GetVenueDetailBySlugQuerystringDTOSchema
>;
