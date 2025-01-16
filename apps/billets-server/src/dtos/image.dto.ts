import { z } from 'zod'

export const GetImageResizeQueryStringDTOSchema = z.object({
  key: z.string(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  format: z.string().optional().default('png'),
})
export type GetImageResizeQueryStringDTO = z.infer<typeof GetImageResizeQueryStringDTOSchema>
