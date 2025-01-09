import { ConcertDTOSchema } from '@/dtos/concert.dto'
import { z } from 'zod'

export const getVenueByIdParamsSchema = z.object({
  id: z.string(),
})

export const getConcertListByVenueIdParamsSchema = z.object({
  venueId: z.string(),
})

export const getConcertListByVenueIdQueryStringSchema = z.object({
  offset: z.string(),
  size: z.string(),
})

export const getConcertListByVenueIdSuccessResponseSchema = z.array(ConcertDTOSchema)
