import {
  getEventDetailByIdHandler,
  getEventDetailBySlugHandler,
  getEventsHandler,
} from '@/controllers/event.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import {
  EventDTOSchema,
  EventDetailDTOSchema,
  GetEventDetailByIdParamsDTOSchema,
  GetEventDetailBySlugParamsDTOSchema,
  GetEventDetailBySlugQuerystringDTOSchema,
  GetEventsQueryStringDTOSchema,
} from '@/dtos/event.dto';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { FastifyPluginCallback } from 'fastify/types/plugin';

const eventRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'event'],
        querystring: GetEventsQueryStringDTOSchema,
        response: {
          200: EventDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getEventsHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:eventId',
    {
      schema: {
        tags: ['v1', 'event'],
        params: GetEventDetailByIdParamsDTOSchema,
        response: {
          200: EventDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getEventDetailByIdHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/slug/:slug',
    {
      schema: {
        tags: ['v1', 'event'],
        params: GetEventDetailBySlugParamsDTOSchema,
        querystring: GetEventDetailBySlugQuerystringDTOSchema,
        response: {
          200: EventDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getEventDetailBySlugHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/detail',
    {
      schema: {
        tags: ['v1', 'event'],
        querystring: GetEventDetailBySlugQuerystringDTOSchema,
        response: {
          200: EventDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getEventDetailBySlugHandler
  );
  done();
};

export default eventRoute;
