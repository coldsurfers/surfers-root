import { errorCodeSchema } from '@/lib/error/error.code.types'
import { z } from 'zod'

export const ErrorResponseDTOSchema = z.object({
  code: errorCodeSchema,
  message: z.string(),
})

export type ErrorResponseDTO = z.infer<typeof ErrorResponseDTOSchema>
