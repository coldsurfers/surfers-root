import { z } from 'zod'

export const VenueDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
})
export type VenueDTO = z.infer<typeof VenueDTOSchema>

export const SubscribeVenueBodyDTOSchema = z.object({
  type: z.literal('subscribe-venue'),
})
export type SubscribeVenueBodyDTO = z.infer<typeof SubscribeVenueBodyDTOSchema>

export const UnsubscribeVenueBodyDTOSchema = z.object({
  type: z.literal('unsubscribe-venue'),
})
export type UnsubscribeVenueBodyDTO = z.infer<typeof UnsubscribeVenueBodyDTOSchema>

export const SubscribeVenueParamsDTOSchema = z.object({
  id: z.string(),
})
export type SubscribeVenueParamsDTO = z.infer<typeof SubscribeVenueParamsDTOSchema>

export const GetVenueByIdParamsDTOSchema = z.object({
  id: z.string(),
})
export type GetVenueByIdParamsDTO = z.infer<typeof GetVenueByIdParamsDTOSchema>

export const GetConcertListByVenueIdParamsDTOSchema = z.object({
  venueId: z.string(),
})
export type GetConcertListByVenueIdParamsDTO = z.infer<typeof GetConcertListByVenueIdParamsDTOSchema>

export const GetConcertListByVenueIdQueryStringSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).max(100).default(20),
})
export type GetConcertListByVenueIdQueryString = z.infer<typeof GetConcertListByVenueIdQueryStringSchema>
