import { concertDTOSerializedSchema } from '@/dtos/concert-dto/concert-dto.types'
import { z } from 'zod'

export const getArtistByIdParamsSchema = z.object({
  id: z.string(),
})
export type GetArtistByIdParams = z.infer<typeof getArtistByIdParamsSchema>

export const getConcertListByArtistIdParamsSchema = z.object({
  artistId: z.string(),
})

export const getConcertListByArtistIdQueryStringSchema = z.object({
  offset: z.string(),
  size: z.string(),
})

export const getConcertListByArtistIdSuccessResponseSchema = z.array(concertDTOSerializedSchema)
