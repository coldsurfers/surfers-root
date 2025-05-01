import { z } from 'zod'

export const DetailImageDTOSchema = z.object({
  id: z.string(),
  url: z.string(),
})
export type DetailImageDTO = z.infer<typeof DetailImageDTOSchema>
