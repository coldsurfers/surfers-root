import { z } from 'zod'

export const PosterDTOSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
})
export type PosterDTO = z.infer<typeof PosterDTOSchema>

export const GetPostersByEventIdQueryStringDTOSchema = z.object({
  eventId: z.string(),
})
export type GetPostersByEventIdQueryStringDTO = z.infer<typeof GetPostersByEventIdQueryStringDTOSchema>
