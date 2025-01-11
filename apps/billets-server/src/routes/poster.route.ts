import { getPostersByConcertIdHandler } from '@/controllers/poster.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { GetPostersByConcertIdParamsDTOSchema, PosterDTOSchema } from '@/dtos/poster.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const posterRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert/:concertId',
    {
      schema: {
        tags: ['v1', 'poster'],
        params: GetPostersByConcertIdParamsDTOSchema,
        response: {
          200: PosterDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getPostersByConcertIdHandler,
  )
  done()
}

export default posterRoute
