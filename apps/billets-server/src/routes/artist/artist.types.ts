import { z } from 'zod'

export const getArtistByIdParamsSchema = z.object({
  id: z.string(),
})
export type GetArtistByIdParams = z.infer<typeof getArtistByIdParamsSchema>
