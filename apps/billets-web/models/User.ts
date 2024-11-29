import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().nullable(),
  created_at: z.string().datetime(),
})

export type UserType = z.infer<typeof UserSchema>
