import { z } from 'zod'

export const ArtistProfileImageDTOSchema = z.object({
  url: z.string().url(),
})
export type ArtistProfileImageDTO = z.infer<typeof ArtistProfileImageDTOSchema>

export const GetArtistProfileImagesByArtistIdParamsDTOSchema = z.object({
  artistId: z.string(),
})
export type GetArtistProfileImagesByArtistIdParamsDTO = z.infer<typeof GetArtistProfileImagesByArtistIdParamsDTOSchema>
