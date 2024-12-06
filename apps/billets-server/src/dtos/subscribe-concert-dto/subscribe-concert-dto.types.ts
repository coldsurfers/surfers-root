import { UsersOnSubscribedConcerts } from '@prisma/client'
import { z } from 'zod'

export type SubscribeConcertDTOProps = Partial<UsersOnSubscribedConcerts>

export const subscribeConcertDTOSerializedSchema = z.object({
  userId: z.string(),
  concertId: z.string(),
})

export const subscribedConcertDTOSerializedListSchema = z.array(subscribeConcertDTOSerializedSchema)

export type SubscribedConcertSerialized = z.infer<typeof subscribeConcertDTOSerializedSchema>

export type SubscribedConcertSerializedList = z.infer<typeof subscribedConcertDTOSerializedListSchema>
