import { z } from 'zod'

export const SendUserVoiceBodyDTOSchema = z.object({
  email: z.string(),
  name: z.string(),
  message: z.string(),
  updateAgreement: z.boolean(),
})
export type SendUserVoiceBodyDTO = z.infer<typeof SendUserVoiceBodyDTOSchema>

export const SendEmailResponseDTOSchema = z.object({
  success: z.boolean(),
})
export type SendEmailResponseDTO = z.infer<typeof SendEmailResponseDTOSchema>
