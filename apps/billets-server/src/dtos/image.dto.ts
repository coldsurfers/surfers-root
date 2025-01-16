import { z } from 'zod'

export const GetImageResizeQueryStringDTOSchema = z.object({
  key: z.string(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  format: z
    /**
     * see lib/constants.ts -> SUPPORTED_MIME_TYPES
     */
    .union([z.literal('jpg'), z.literal('jpeg'), z.literal('png')])
    .optional()
    .default('png'),
})
export type GetImageResizeQueryStringDTO = z.infer<typeof GetImageResizeQueryStringDTOSchema>
