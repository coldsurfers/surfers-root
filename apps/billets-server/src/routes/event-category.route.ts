import { getEventCategoryListHandler } from '@/controllers/event-category.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import { EventCategoryDTOSchema } from '@/dtos/event-category.dto';
import type { FastifyPluginCallback } from 'fastify';

const eventCategoryRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['v1', 'event category'],
        response: {
          200: EventCategoryDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getEventCategoryListHandler
  );
  done();
};

export default eventCategoryRoute;
