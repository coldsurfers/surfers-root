import { z } from 'zod'

export const userDTOSerializedSchema = z.object({
  id: z.string(),
  email: z.string(),
  provider: z.string(),
})

export type UserDTOSerialized = z.infer<typeof userDTOSerializedSchema>
