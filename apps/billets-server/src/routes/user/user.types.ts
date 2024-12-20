import { userDTOSerializedSchema } from '@/dtos/user-dto/user-dto.types'
import { z } from 'zod'

export const getMeResponseSchema = userDTOSerializedSchema
export type GetMeResponse = z.infer<typeof getMeResponseSchema>

export const deactivateUserBodySchema = z.object({
  type: z.literal('deactivate'),
})

export const activateUserBodySchema = z.object({
  type: z.literal('activate'),
  authCode: z.string(),
  email: z.string().email(),
})
