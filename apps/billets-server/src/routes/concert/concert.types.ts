import { concertDTOSerializedSchema } from '@/dtos/concert-dto/concert-dto.types'
import { z } from 'zod'

export const concertListQueryStringSchema = z.object({
  offset: z.string(),
  size: z.string(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
})

export type ConcertListQueryString = z.infer<typeof concertListQueryStringSchema>

export const concertListResponseSchema = z.array(concertDTOSerializedSchema)
export type ConcertListResponse = z.infer<typeof concertListResponseSchema>

export const concertDetailParamsSchema = z.object({
  id: z.string().uuid(),
})
export type ConcertDetailParams = z.infer<typeof concertDetailParamsSchema>

export const concertDetailResponseSchema = concertDTOSerializedSchema
export type ConcertDetailResponse = z.infer<typeof concertDetailResponseSchema>

export const concertSearchParamsSchema = z.object({
  keyword: z.string(),
  offset: z.string(),
  size: z.string(),
})
export type ConcertSearchParams = z.infer<typeof concertSearchParamsSchema>
export const concertSearchResponseSchema = z.array(concertDTOSerializedSchema)
export type ConcertSearchResponse = z.infer<typeof concertSearchResponseSchema>
