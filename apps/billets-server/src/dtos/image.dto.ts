import { z } from 'zod'

export const GetImageResizeQueryStringDTOSchema = z.object({
  key: z.string(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  format: z.string(),
})
export type GetImageResizeQueryStringDTO = z.infer<typeof GetImageResizeQueryStringDTOSchema>
