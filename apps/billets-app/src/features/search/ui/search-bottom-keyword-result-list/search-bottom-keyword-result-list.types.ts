import { z } from 'zod'

export const searchBottomKeywordArtistListItemSchema = z.object({
  type: z.literal('artist'),
  id: z.string(),
  name: z.string(),
  profileImgUrl: z.string(),
})
export const searchBottomKeywordVenueListItemSchema = z.object({
  type: z.literal('venue'),
  id: z.string(),
  name: z.string(),
})
export const searchBottomKeywordConcertListItemSchema = z.object({
  type: z.literal('concert'),
  date: z.string().datetime(),
  id: z.string(),
  thumbnailImgUrl: z.string(),
  title: z.string(),
  venueTitle: z.string(),
})
export const searchBottomKeywordListItemSchema = z.discriminatedUnion('type', [
  searchBottomKeywordArtistListItemSchema,
  searchBottomKeywordVenueListItemSchema,
  searchBottomKeywordConcertListItemSchema,
])
