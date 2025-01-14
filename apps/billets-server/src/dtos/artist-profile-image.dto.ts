import { z } from 'zod'

export const ArtistProfileImageDTOSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
})
export type ArtistProfileImageDTO = z.infer<typeof ArtistProfileImageDTOSchema>

export const GetArtistProfileImagesByArtistIdQueryStringDTOSchema = z.object({
  artistId: z.string(),
})
export type GetArtistProfileImagesByArtistIdQueryStringDTO = z.infer<
  typeof GetArtistProfileImagesByArtistIdQueryStringDTOSchema
>
