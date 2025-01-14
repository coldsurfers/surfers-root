import { z } from 'zod'

export const FCMTokenDTOSchema = z.object({
  id: z.string(),
  token: z.string(),
})
export type FCMTokenDTO = z.infer<typeof FCMTokenDTOSchema>

export const PostFCMTokenBodyDTOSchema = z.object({
  fcmToken: z.string(),
})
export type PostFCMTokenBodyDTO = z.infer<typeof PostFCMTokenBodyDTOSchema>
