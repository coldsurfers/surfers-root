import { z } from 'zod'
import { UsersOnSubscribedVenues } from '@prisma/client'

export type SubscribeVenueProps = Partial<UsersOnSubscribedVenues>

export const subscribeVenueSerializedSchema = z.object({
  venueId: z.string(),
  userId: z.string(),
})

export type SubscribeVenueSerialized = z.infer<typeof subscribeVenueSerializedSchema>
