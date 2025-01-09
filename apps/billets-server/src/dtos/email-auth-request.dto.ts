import { z } from 'zod'

export const EmailAuthRequestDTOSchema = z.object({
  email: z.string().email(),
  authcode: z.string(),
  authenticated: z.boolean(),
  createdAt: z.string().datetime(),
  id: z.string(),
})
export type EmailAuthRequestDTO = z.infer<typeof EmailAuthRequestDTOSchema>
