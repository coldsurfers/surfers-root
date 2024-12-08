import { authTokenDTOSerializedSchema } from '@/dtos/auth-token-dto'
import { userDTOSerializedSchema } from '@/dtos/user-dto/user-dto.types'
import { z } from 'zod'

export const signInBodySchema = z.object({
  provider: z.union([z.literal('google'), z.literal('apple'), z.literal('email')]),
  email: z.string(),
  password: z.string().optional(),
  token: z.string().optional(),
  platform: z.union([z.literal('android'), z.literal('ios')]).optional(),
})

export type SignInBody = z.infer<typeof signInBodySchema>

export const signInResponseSchema = z.object({
  user: userDTOSerializedSchema,
  authToken: authTokenDTOSerializedSchema,
})

export type SignInResponse = z.infer<typeof signInResponseSchema>

export const sendAuthCodeBodySchema = z.object({
  email: z.string().email(),
})

export type SendAuthCodeBody = z.infer<typeof sendAuthCodeBodySchema>

export const sendAuthCodeResponseSchema = z.object({
  email: z.string().email(),
})

export type SendAuthCodeResponse = z.infer<typeof sendAuthCodeResponseSchema>

export const confirmAuthCodeBodySchema = z.object({
  email: z.string().email(),
  authCode: z.string().length(6),
})
export type ConfirmAuthCodeBody = z.infer<typeof confirmAuthCodeBodySchema>

export const confirmAuthCodeResponseSchema = z.object({
  email: z.string().email(),
})

export type ConfirmAuthCodeResponse = z.infer<typeof confirmAuthCodeResponseSchema>

export const signUpBodySchema = z.object({
  provider: z.union([z.literal('google'), z.literal('apple'), z.literal('email')]),
  email: z.string(),
  password: z.string().optional(),
  token: z.string().optional(),
  platform: z.union([z.literal('android'), z.literal('ios')]).optional(),
})

export type SignUpBody = z.infer<typeof signUpBodySchema>

export const signUpResponseSchema = z.object({
  user: userDTOSerializedSchema,
  authToken: authTokenDTOSerializedSchema,
})

export type SignUpResponse = z.infer<typeof signUpResponseSchema>
