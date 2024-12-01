import { z } from 'zod'

export const getVenueByIdParamsSchema = z.object({
  id: z.string(),
})

export const getConcertListByVenueIdParamsSchema = z.object({
  venueId: z.string(),
})
