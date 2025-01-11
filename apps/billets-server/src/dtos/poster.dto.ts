import { z } from 'zod'

export const PosterDTOSchema = z.object({
  url: z.string().url(),
})
export type PosterDTO = z.infer<typeof PosterDTOSchema>

export const GetPostersByConcertIdParamsDTOSchema = z.object({
  concertId: z.string(),
})
export type GetPostersByConcertIdParamsDTO = z.infer<typeof GetPostersByConcertIdParamsDTOSchema>
