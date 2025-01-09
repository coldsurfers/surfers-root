import { z } from 'zod'

export const ArtistDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  artistProfileImage: z.array(
    z.object({
      id: z.string(),
      imageURL: z.string(),
      copyright: z
        .object({
          id: z.string(),
          owner: z.string(),
          license: z.string(),
          licenseURL: z.string(),
        })
        .nullable(),
    }),
  ),
})
export type ArtistDTO = z.infer<typeof ArtistDTOSchema>
