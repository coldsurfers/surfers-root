import { z } from 'zod'

export const ArtistDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  // artistProfileImage: z.array(
  //   z.object({
  //     id: z.string(),
  //     imageURL: z.string(),
  //     copyright: z
  //       .object({
  //         id: z.string(),
  //         owner: z.string(),
  //         license: z.string(),
  //         licenseURL: z.string(),
  //       })
  //       .nullable(),
  //   }),
  // ),
})
export type ArtistDTO = z.infer<typeof ArtistDTOSchema>

export const GetArtistByIdParamsDTOSchema = z.object({
  id: z.string(),
})
export type GetArtistByIdParamsDTO = z.infer<typeof GetArtistByIdParamsDTOSchema>

export const GetConcertListByArtistIdParamsDTOSchema = z.object({
  artistId: z.string(),
})
export type GetConcertListByArtistIdParamsDTO = z.infer<typeof GetConcertListByArtistIdParamsDTOSchema>

export const GetConcertListByArtistIdQueryStringDTOSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).default(0),
})
export type GetConcertListByArtistIdQueryStringDTO = z.infer<typeof GetConcertListByArtistIdQueryStringDTOSchema>

export const SubscribeArtistBodyDTOSchema = z.object({
  type: z.literal('subscribe-artist'),
})
export type SubscribeArtistBodyDTO = z.infer<typeof SubscribeArtistBodyDTOSchema>

export const UnsubscribeArtistBodyDTOSchema = z.object({
  type: z.literal('unsubscribe-artist'),
})
export type UnsubscribeArtistBodyDTO = z.infer<typeof UnsubscribeArtistBodyDTOSchema>

export const GetArtistsByConcertIdParamsDTOSchema = z.object({
  concertId: z.string(),
})
export type GetArtistsByConcertIdParamsDTO = z.infer<typeof GetArtistsByConcertIdParamsDTOSchema>
