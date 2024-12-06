import { UsersOnSubscribedArtists } from '@prisma/client'
import { z } from 'zod'

export type SubscribeArtistDTOProps = Partial<UsersOnSubscribedArtists>
export const subscribedArtistDTOSerializedSchema = z.object({
  artistId: z.string(),
  userId: z.string(),
})

export type SubscribedArtistSerialized = z.infer<typeof subscribedArtistDTOSerializedSchema>
