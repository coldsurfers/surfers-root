import { postFCMTokenHandler } from '@/controllers/fcm.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import { FCMTokenDTOSchema, PostFCMTokenBodyDTOSchema } from '@/dtos/fcm-token.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const fcmRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/token',
    {
      schema: {
        tags: ['v1', 'fcm'],
        body: PostFCMTokenBodyDTOSchema,
        response: {
          201: FCMTokenDTOSchema,
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    postFCMTokenHandler
  );
  done();
};

export default fcmRoute;
