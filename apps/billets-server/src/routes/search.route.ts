import { searchListHandler } from '@/controllers/search.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import { SearchDTOSchema, SearchListQueryStringDTOSchema } from '@/dtos/search.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

/**
 * /v1/search
 */
const searchRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'search'],
        querystring: SearchListQueryStringDTOSchema,
        response: {
          200: SearchDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    searchListHandler
  );
  done();
};

export default searchRoute;
