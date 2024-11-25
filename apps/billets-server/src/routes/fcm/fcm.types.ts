import { z } from 'zod'

export const postFCMTokenBodySchema = z.object({
  fcmToken: z.string(),
})
export type PostFCMTokenBody = z.infer<typeof postFCMTokenBodySchema>
