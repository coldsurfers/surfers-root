import { z } from 'zod'

export const fcmTokenDTOSerializedSchema = z.object({
  id: z.string(),
  token: z.string(),
})
export type FCMTokenDTOSerialized = z.infer<typeof fcmTokenDTOSerializedSchema>
