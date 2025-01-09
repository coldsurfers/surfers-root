import { z } from 'zod'

export const UserDTOSchema = z.object({
  id: z.string(),
  email: z.string(),
  provider: z.string(),
  deactivatedAt: z.date().nullable(),
})
export type UserDTO = z.infer<typeof UserDTOSchema>

export const CreateUserDTOSchema = z.object({
  email: z.string().email(),
  provider: z.union([z.literal('email'), z.literal('google'), z.literal('apple')]),
  password: z.string().optional(),
  passwordSalt: z.string().optional(),
})
export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>
