import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getLocationConcertsHandler } from './location.handler'
import { getLocationConcertsQueryStringSchema } from './location.types'

export const locationRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert',
    {
      schema: {
        tags: ['v1', 'location'],
        querystring: getLocationConcertsQueryStringSchema,
      },
    },
    getLocationConcertsHandler,
  )

  done()
}
