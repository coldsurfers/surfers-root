import { z } from 'zod'
import { CopyrightDTOSchema } from './copyright.dto'

export const ArtistDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  thumbUrl: z.string().nullable(),
  thumbCopyright: CopyrightDTOSchema.nullable(),
})
export type ArtistDTO = z.infer<typeof ArtistDTOSchema>

export const GetArtistByIdParamsDTOSchema = z.object({
  id: z.string(),
})
export type GetArtistByIdParamsDTO = z.infer<typeof GetArtistByIdParamsDTOSchema>

export const GetConcertListByArtistIdParamsDTOSchema = z.object({
  artistId: z.string(),
})
export type GetConcertListByArtistIdParamsDTO = z.infer<typeof GetConcertListByArtistIdParamsDTOSchema>

export const GetConcertListByArtistIdQueryStringDTOSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).default(0),
})
export type GetConcertListByArtistIdQueryStringDTO = z.infer<typeof GetConcertListByArtistIdQueryStringDTOSchema>

export const GetArtistsByConcertIdParamsDTOSchema = z.object({
  concertId: z.string(),
})
export type GetArtistsByConcertIdParamsDTO = z.infer<typeof GetArtistsByConcertIdParamsDTOSchema>
