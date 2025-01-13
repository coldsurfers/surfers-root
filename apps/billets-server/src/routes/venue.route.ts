import { getVenueByIdHandler } from '@/controllers/venue.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { VenueDetailDTOSchema } from '@/dtos/venue-detail-dto'
import { GetVenueByIdParamsDTOSchema } from '@/dtos/venue.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const venueRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'venue'],
        params: GetVenueByIdParamsDTOSchema,
        response: {
          200: VenueDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getVenueByIdHandler,
  )
  done()
}

export default venueRoute
