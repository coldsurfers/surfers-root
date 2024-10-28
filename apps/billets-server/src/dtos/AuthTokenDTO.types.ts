import { AuthToken } from '@prisma/client'
import { z } from 'zod'

export type AuthTokenDTOProps = Partial<AuthToken>

export const authTokenDTOSerializedSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type AuthTokenDTOSerialized = z.infer<typeof authTokenDTOSerializedSchema>
