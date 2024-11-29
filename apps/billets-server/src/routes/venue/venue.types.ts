import { z } from 'zod'

export const getVenueByIdParamsSchema = z.object({
  id: z.string(),
})
