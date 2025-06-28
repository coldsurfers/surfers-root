import {
  getLocationCityListHandler,
  getLocationConcertsHandler,
  getLocationCountryListHandler,
} from '@/controllers/location.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import {
  GetLocationConcertsQueryStringDTOSchema,
  LocationCityDTOSchema,
  LocationConcertDTOSchema,
  LocationCountryDTOSchema,
} from '@/dtos/location.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const locationRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert',
    {
      schema: {
        tags: ['v1', 'location'],
        querystring: GetLocationConcertsQueryStringDTOSchema,
        response: {
          200: LocationConcertDTOSchema.array(),
          400: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getLocationConcertsHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/city',
    {
      schema: {
        tags: ['v1', 'location'],
        response: {
          200: LocationCityDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getLocationCityListHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/country',
    {
      schema: {
        tags: ['v1', 'location'],
        response: {
          200: LocationCountryDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getLocationCountryListHandler
  );

  done();
};

export default locationRoute;
