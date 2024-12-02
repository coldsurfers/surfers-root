import { z } from 'zod'
import { errorCodeSchema } from './error.code.types'

export const errorResponseSchema = z.object({
  code: errorCodeSchema,
  message: z.string(),
})

export type ErrorResponse = z.infer<typeof errorResponseSchema>
