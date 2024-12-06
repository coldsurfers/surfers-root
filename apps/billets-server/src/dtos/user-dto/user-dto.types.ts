import { z } from 'zod'

export const userDTOSerializedSchema = z.object({
  id: z.string(),
  email: z.string(),
  provider: z.string(),
  deactivatedAt: z.date().nullable(),
})

export type UserDTOSerialized = z.infer<typeof userDTOSerializedSchema>
