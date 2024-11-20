import { Artist, ArtistProfileImage, Concert, Poster, Price, Ticket, Venue } from '@prisma/client'
import { z } from 'zod'

export type ConcertDTOProps = Partial<
  Concert & {
    posters: Partial<Poster>[]
  } & {
    venues: Partial<Venue>[]
  } & {
    artists: Partial<
      Artist & {
        artistProfileImage: Partial<ArtistProfileImage>[]
      }
    >[]
  } & {
    tickets: Partial<Ticket & { prices: Partial<Price>[] }>[]
  }
>
export const concertDTOSerializedSchema = z.object({
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
      venueTitle: z.string(),
    }),
  ),
  artists: z.array(
    z.object({
      name: z.string(),
      profileImageUrl: z.string(),
    }),
  ),
  tickets: z.array(
    z.object({
      url: z.string(),
      openDate: z.string().datetime(),
      prices: z.array(
        z.object({
          id: z.string(),
          price: z.number(),
          currency: z.string(),
        }),
      ),
    }),
  ),
})
export type ConcertDTOSerialized = z.infer<typeof concertDTOSerializedSchema>
