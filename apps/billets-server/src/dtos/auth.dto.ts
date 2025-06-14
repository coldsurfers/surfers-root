import { z } from 'zod'
import { AuthTokenDTOSchema } from './auth-token.dto'
import { UserDTOSchema } from './user.dto'

export const SignInBodyDTOSchema = z.object({
  provider: z.union([z.literal('google'), z.literal('apple'), z.literal('email')]),
  email: z.string(),
  password: z.string().optional(),
  token: z.string().optional(),
  platform: z.union([z.literal('android'), z.literal('ios'), z.literal('web')]).optional(),
})
export type SignInBodyDTO = z.infer<typeof SignInBodyDTOSchema>

export const UserWithAuthTokenDTOSchema = z.object({
  user: UserDTOSchema,
  authToken: AuthTokenDTOSchema,
})
export type UserWithAuthTokenDTO = z.infer<typeof UserWithAuthTokenDTOSchema>

export const SignUpBodyDTOSchema = z.object({
  provider: z.union([z.literal('google'), z.literal('apple'), z.literal('email')]),
  email: z.string(),
  password: z.string().optional(),
  token: z.string().optional(),
  platform: z.union([z.literal('android'), z.literal('ios')]).optional(),
})
export type SignUpBodyDTO = z.infer<typeof SignUpBodyDTOSchema>
