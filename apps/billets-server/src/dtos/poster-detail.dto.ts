import { z } from 'zod'
import { CopyrightDTOSchema } from './copyright.dto'
import { PosterDTOSchema } from './poster.dto'

export const PosterDetailDTOSchema = PosterDTOSchema.extend({
  copyright: CopyrightDTOSchema.nullable(),
})
export type PosterDetailDTO = z.infer<typeof PosterDetailDTOSchema>

export const GetPosterDetailByPosterIdParamsDTOSchema = z.object({
  posterId: z.string(),
})
export type GetPosterDetailByPosterIdParamsDTO = z.infer<typeof GetPosterDetailByPosterIdParamsDTOSchema>
