import { z } from 'zod'
import { ArtistDTOSchema } from './artist.dto'
import { PosterDTOSchema } from './poster.dto'
import { VenueDTOSchema } from './venue.dto'

export const ConcertDTOSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  date: z.string().datetime(),
  mainPoster: z
    .object({
      url: z.string().url(),
    })
    .nullable(),
  mainVenue: z
    .object({
      name: z.string(),
    })
    .nullable(),
})
export type ConcertDTO = z.infer<typeof ConcertDTOSchema>

export const ConcertDetailDTOSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  date: z.string().datetime(),
  posters: PosterDTOSchema.array(),
  venues: VenueDTOSchema.array(),
  artists: ArtistDTOSchema.array(),
})
export type ConcertDetailDTO = z.infer<typeof ConcertDetailDTOSchema>

export const FindManyConcertDTOSchema = z.object({
  titleContains: z.string().optional(),
  orderBy: z.union([z.literal('latest'), z.literal('oldest')]),
  take: z.number(),
  skip: z.number(),
  venueGeohash: z.string().nullable(),
})
export type FindManyConcertDTO = z.infer<typeof FindManyConcertDTOSchema>

export const FindManyByVenueIdConcertDTOSchema = z.object({
  venueId: z.string(),
  orderBy: z.union([z.literal('latest'), z.literal('oldest')]),
  take: z.number(),
  skip: z.number(),
})
export type FindManyByVenueIdConcertDTO = z.infer<typeof FindManyByVenueIdConcertDTOSchema>

export const FindManyByArtistIdConcertDTOSchema = z.object({
  artistId: z.string(),
  orderBy: z.union([z.literal('latest'), z.literal('oldest')]),
  take: z.number(),
  skip: z.number(),
})
export type FindManyByArtistIdConcertDTO = z.infer<typeof FindManyByArtistIdConcertDTOSchema>

export const SubscribeUnsubscribeConcertDTOSchema = z.object({
  concertId: z.string(),
  userId: z.string(),
})
export type SubscribeUnsubscribeConcertDTO = z.infer<typeof SubscribeUnsubscribeConcertDTOSchema>

export const GetConcertByIdParamsDTOSchema = z.object({
  id: z.string(),
})
export type GetConcertByIdParamsDTO = z.infer<typeof GetConcertByIdParamsDTOSchema>

export const GetConcertListQueryStringDTOSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).default(0),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type GetConcertListQueryStringDTO = z.infer<typeof GetConcertListQueryStringDTOSchema>

export const ConcertSearchQueryStringDTOSchema = z.object({
  keyword: z.string(),
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).default(0),
})
export type ConcertSearchQueryStringDTO = z.infer<typeof ConcertSearchQueryStringDTOSchema>
