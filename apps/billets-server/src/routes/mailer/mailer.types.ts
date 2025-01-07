import { z } from 'zod'

export const sendUserVoiceBodySchema = z.object({
  email: z.string(),
  name: z.string(),
  message: z.string(),
  updateAgreement: z.boolean(),
})

export const sendEmailResponseSchema = z.object({
  success: z.boolean(),
})
