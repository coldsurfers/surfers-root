import { getArtistProfileImagesByArtistIdHandler } from '@/controllers/artist-profile-image.controller'
import {
  ArtistProfileImageDTOSchema,
  GetArtistProfileImagesByArtistIdParamsDTOSchema,
} from '@/dtos/artist-profile-image.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyPluginCallback } from 'fastify/types/plugin'

const artistProfileImageRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/artist/:artistId',
    {
      schema: {
        tags: ['v1', 'artist-profile-image'],
        params: GetArtistProfileImagesByArtistIdParamsDTOSchema,
        response: {
          200: ArtistProfileImageDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getArtistProfileImagesByArtistIdHandler,
  )
  done()
}

export default artistProfileImageRoute
