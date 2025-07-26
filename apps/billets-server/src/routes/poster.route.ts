import {
  getPosterDetailByPosterIdHandler,
  getPostersByEventIdHandler,
} from '@/controllers/poster.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import {
  GetPosterDetailByPosterIdParamsDTOSchema,
  PosterDetailDTOSchema,
} from '@/dtos/poster-detail.dto';
import { GetPostersByEventIdQueryStringDTOSchema, PosterDTOSchema } from '@/dtos/poster.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const posterRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
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
    getPostersByEventIdHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:posterId',
    {
      schema: {
        tags: ['v1', 'poster'],
        params: GetPosterDetailByPosterIdParamsDTOSchema,
        response: {
          200: PosterDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getPosterDetailByPosterIdHandler
  );
  done();
};

export default posterRoute;
