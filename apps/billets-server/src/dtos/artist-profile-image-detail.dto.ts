import { z } from 'zod'
import { ArtistProfileImageDTOSchema } from './artist-profile-image.dto'
import { CopyrightDTOSchema } from './copyright.dto'

export const ArtistProfileImageDetailDTOSchema = ArtistProfileImageDTOSchema.extend({
  copyright: CopyrightDTOSchema.nullable(),
})
export type ArtistProfileImageDetailDTO = z.infer<typeof ArtistProfileImageDetailDTOSchema>

export const GetArtistProfileImageDetailParamsDTOSchema = z.object({
  artistProfileImageId: z.string(),
})
export type GetArtistProfileImageDetailParamsDTO = z.infer<typeof GetArtistProfileImageDetailParamsDTOSchema>
