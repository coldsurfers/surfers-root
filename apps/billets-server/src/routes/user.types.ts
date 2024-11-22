import { z } from 'zod'
import { userDTOSerializedSchema } from '../dtos/UserDTO.types'

export const getMeResponseSchema = userDTOSerializedSchema
export type GetMeResponse = z.infer<typeof getMeResponseSchema>

export const postFCMTokenBodySchema = z.object({
  fcmToken: z.string(),
})
export type PostFCMTokenBody = z.infer<typeof postFCMTokenBodySchema>

export const postFCMTokenResponseSchema = z.object({
  userId: z.string(),
  fcmToken: z.string(),
})
export type PostFCMTokenResponse = z.infer<typeof postFCMTokenResponseSchema>
