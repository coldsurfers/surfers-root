import { getVenueByIdHandler, getVenueBySlugHandler } from '@/controllers/venue.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import { VenueDetailDTOSchema } from '@/dtos/venue-detail-dto';
import { GetVenueByIdParamsDTOSchema, GetVenueBySlugDTOSchema } from '@/dtos/venue.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const venueRoute: FastifyPluginCallback = (fastify, _, done) => {
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
    getVenueByIdHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/slug/:slug',
    {
      schema: {
        tags: ['v1', 'venue'],
        params: GetVenueBySlugDTOSchema,
        response: {
          200: VenueDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getVenueBySlugHandler
  );
  done();
};

export default venueRoute;
