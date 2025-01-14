import { z } from 'zod'

export const EventSubscribeDTOSchema = z.object({
  userId: z.string().uuid(),
  eventId: z.string().uuid(),
  subscribedAt: z.string().datetime(),
})
export type EventSubscribeDTO = z.infer<typeof EventSubscribeDTOSchema>

export const GetSubscribedEventsQueryStringDTOSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).max(100).default(20),
})
export type GetSubscribedEventsQueryStringDTO = z.infer<typeof GetSubscribedEventsQueryStringDTOSchema>

export const GetSubscribedEventByEventIdParamsDTOSchema = z.object({
  eventId: z.string().uuid(),
})
export type GetSubscribedEventByEventIdParamsDTO = z.infer<typeof GetSubscribedEventByEventIdParamsDTOSchema>

export const SubscribeEventBodyDTOSchema = z.object({
  eventId: z.string(),
})
export type SubscribeEventBodyDTO = z.infer<typeof SubscribeEventBodyDTOSchema>

export const ArtistSubscribeDTOSchema = z.object({
  userId: z.string().uuid(),
  artistId: z.string().uuid(),
  subscribedAt: z.string().datetime(),
})
export type ArtistSubscribeDTO = z.infer<typeof ArtistSubscribeDTOSchema>

export const GetSubscribedArtistParamsDTOSchema = z.object({
  artistId: z.string().uuid(),
})
export type GetSubscribedArtistParamsDTO = z.infer<typeof GetSubscribedArtistParamsDTOSchema>

export const SubscribeArtistBodyDTOSchema = z.object({
  artistId: z.string().uuid(),
})
export type SubscribeArtistBodyDTO = z.infer<typeof SubscribeArtistBodyDTOSchema>

export const UnsubscribeArtistBodyDTOSchema = z.object({
  artistId: z.string().uuid(),
})
export type UnsubscribeArtistBodyDTO = z.infer<typeof UnsubscribeArtistBodyDTOSchema>

export const GetSubscribedVenueParamsDTOSchema = z.object({
  venueId: z.string().uuid(),
})
export type GetSubscribedVenueParamsDTO = z.infer<typeof GetSubscribedVenueParamsDTOSchema>

export const VenueSubscribeDTOSchema = z.object({
  userId: z.string().uuid(),
  venueId: z.string().uuid(),
  subscribedAt: z.string().datetime(),
})
export type VenueSubscribeDTO = z.infer<typeof VenueSubscribeDTOSchema>

export const SubscribeVenueBodyDTOSchema = z.object({
  venueId: z.string().uuid(),
})
export type SubscribeVenueBodyDTO = z.infer<typeof SubscribeVenueBodyDTOSchema>

export const UnsubscribeVenueBodyDTOSchema = z.object({
  venueId: z.string().uuid(),
})
export type UnsubscribeVenueBodyDTO = z.infer<typeof UnsubscribeVenueBodyDTOSchema>
