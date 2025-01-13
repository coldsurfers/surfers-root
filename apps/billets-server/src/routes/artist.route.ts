import { getArtistByIdHandler } from '@/controllers/artist.controller'
import { ArtistDTOSchema, GetArtistByIdParamsDTOSchema } from '@/dtos/artist.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const artistRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'artist'],
        params: GetArtistByIdParamsDTOSchema,
        response: {
          200: ArtistDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getArtistByIdHandler,
  )
  done()
}

export default artistRoute
