import { z } from 'zod'

export const ConcertDTOSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  date: z.string().datetime(),
  posters: z.array(
    z.object({
      imageUrl: z.string(),
    }),
  ),
  venues: z.array(
    z.object({
      id: z.string(),
      venueTitle: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      address: z.string(),
    }),
  ),
  artists: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      profileImageUrl: z.string(),
    }),
  ),
  tickets: z.array(
    z.object({
      seller: z.string(),
      url: z.string(),
      openDate: z.string().datetime(),
      prices: z.array(
        z.object({
          id: z.string(),
          price: z.number(),
          currency: z.string(),
          title: z.string(),
        }),
      ),
    }),
  ),
})
export type ConcertDTO = z.infer<typeof ConcertDTOSchema>

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
