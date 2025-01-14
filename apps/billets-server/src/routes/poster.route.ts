import { getPostersByEventIdHandler } from '@/controllers/poster.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { GetPostersByEventIdQueryStringDTOSchema, PosterDTOSchema } from '@/dtos/poster.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const posterRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert/:concertId',
    {
      schema: {
        tags: ['v1', 'poster'],
        querystring: GetPostersByEventIdQueryStringDTOSchema,
        response: {
          200: PosterDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getPostersByEventIdHandler,
  )
  done()
}

export default posterRoute
