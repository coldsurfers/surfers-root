import { z } from 'zod'

export const searchDTOPropsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('artist'),
    name: z.string(),
    profileImgUrl: z.string(),
    id: z.string(),
  }),
  z.object({
    type: z.literal('venue'),
    name: z.string(),
    id: z.string(),
  }),
  z.object({
    type: z.literal('concert'),
    title: z.string(),
    thumbnailImgUrl: z.string(),
    date: z.string().datetime(),
    venueTitle: z.string(),
    id: z.string(),
  }),
])

export type SearchDTOProps = z.infer<typeof searchDTOPropsSchema>

export const searchDTOSerializedSchema = searchDTOPropsSchema
export type SearchDTOSerialized = z.infer<typeof searchDTOSerializedSchema>
