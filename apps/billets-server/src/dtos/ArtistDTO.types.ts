import { Artist, ArtistProfileImage, Copyright } from '@prisma/client'
import { z } from 'zod'

export type ArtistDTOProps = Partial<Artist> & {
  artistProfileImage: Partial<
    ArtistProfileImage & {
      copyright: Partial<Copyright> | null
    }
  >[]
}

export const artistDTOSerializedSchema = z.object({
  id: z.string(),
  artistProfileImage: z.array(
    z.object({
      id: z.string(),
      imageURL: z.string(),
      copyright: z
        .object({
          id: z.string(),
          owner: z.string(),
          license: z.string(),
        })
        .nullable(),
    }),
  ),
})
export type ArtistDTOSerialized = z.infer<typeof artistDTOSerializedSchema>
