import { z } from 'zod'

export const CopyrightDTOSchema = z.object({
  id: z.string(),
  owner: z.string(),
  license: z.string(),
  licenseURL: z.string(),
})
export type CopyrightDTO = z.infer<typeof CopyrightDTOSchema>

export const GetCopyrightByArtistProfileImageIdParamsDTOSchema = z.object({
  artistProfileImageId: z.string(),
})
export type GetCopyrightByArtistProfileImageIdParamsDTO = z.infer<
  typeof GetCopyrightByArtistProfileImageIdParamsDTOSchema
>
