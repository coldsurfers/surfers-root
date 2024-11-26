import { z } from 'zod'

export type TopicType = 'new-concert'

const baseFirebaseMessageDataSchema = z.object({
  navigationId: z.union([z.literal('home'), z.literal('my'), z.literal('search'), z.literal('concert-detail')]),
})
const newConcertFirebaseMessageDataSchema = baseFirebaseMessageDataSchema.extend({
  type: z.literal('new-concert'),
  concertId: z.string(),
})
export const firebaseMessageDataSchema = z.discriminatedUnion('type', [newConcertFirebaseMessageDataSchema])

export type FirebaseMessageData = z.infer<typeof firebaseMessageDataSchema>
