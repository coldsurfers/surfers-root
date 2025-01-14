import { z } from 'zod'

export const AuthTokenDTOSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})
export type AuthTokenDTO = z.infer<typeof AuthTokenDTOSchema>

export const CreateAuthTokenDTOSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user_id: z.string(),
})
export type CreateAuthTokenDTO = z.infer<typeof CreateAuthTokenDTOSchema>
