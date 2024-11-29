import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getVenueByIdRoute } from './venue.handler'
import { getVenueByIdParamsSchema } from './venue.types'

export const venueRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'venue'],
        params: getVenueByIdParamsSchema,
      },
    },
    getVenueByIdRoute,
  )
  done()
}
