import { z } from 'zod'

export const EmailAuthRequestDTOSchema = z.object({
  email: z.string().email(),
  authcode: z.string(),
  authenticated: z.boolean(),
  createdAt: z.string().datetime(),
  id: z.string(),
})
export type EmailAuthRequestDTO = z.infer<typeof EmailAuthRequestDTOSchema>

export const SendEmailAuthCodeBodyDTOSchema = z.object({
  email: z.string().email(),
})
export type SendEmailAuthCodeBodyDTO = z.infer<typeof SendEmailAuthCodeBodyDTOSchema>

export const SendAuthCodeResponseDTOSchema = z.object({
  email: z.string().email(),
})
export type SendAuthCodeResponseDTO = z.infer<typeof SendAuthCodeResponseDTOSchema>

export const ConfirmAuthCodeBodyDTOSchema = z.object({
  email: z.string().email(),
  authCode: z.string().length(6),
})
export type ConfirmAuthCodeBodyDTO = z.infer<typeof ConfirmAuthCodeBodyDTOSchema>

export const ConfirmAuthCodeResponseDTOSchema = z.object({
  email: z.string().email(),
})
export type ConfirmAuthCodeResponseDTO = z.infer<typeof ConfirmAuthCodeResponseDTOSchema>
