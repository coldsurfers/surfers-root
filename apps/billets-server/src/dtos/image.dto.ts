import { z } from 'zod'

export const GetImageResizeQueryStringDTOSchema = z.object({
  key: z.string(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  format: z
    /**
     * see lib/constants.ts -> SUPPORTED_MIME_TYPES
     */
    .union([z.literal('jpg'), z.literal('jpeg'), z.literal('png'), z.literal('webp')])
    .optional()
    .default('png'),
})
export type GetImageResizeQueryStringDTO = z.infer<typeof GetImageResizeQueryStringDTOSchema>

export const UploadImageBodyDTOSchema = z.object({
  imageUrl: z.string(),
  resolution: z.enum(['low', 'medium', 'high']),
  concertId: z.string(),
  index: z.number(),
})

export type UploadImageBodyDTO = z.infer<typeof UploadImageBodyDTOSchema>

export const UploadImageResponseDTOSchema = z.object({
  key: z.string(),
})
export type UploadImageResponseDTO = z.infer<typeof UploadImageResponseDTOSchema>
