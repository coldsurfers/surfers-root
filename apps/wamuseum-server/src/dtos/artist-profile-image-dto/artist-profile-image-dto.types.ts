import { z } from 'zod'

export const artistProfileImageDTOSerializedSchema = z.object({
  id: z.string(),
  imageURL: z.string(),
  artistId: z.string(),
})
export type ArtistProfileImageDTOSerialized = z.infer<typeof artistProfileImageDTOSerializedSchema>
