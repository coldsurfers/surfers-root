import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { artistDTOSerializedSchema } from '../../dtos/ArtistDTO.types'
import { errorResponseSchema } from '../../lib/error'
import { getArtistByIdHandler } from './artist.handler'
import { getArtistByIdParamsSchema } from './artist.types'

export const artistRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'artist'],
        params: getArtistByIdParamsSchema,
        response: {
          200: artistDTOSerializedSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    getArtistByIdHandler,
  )
  done()
}
