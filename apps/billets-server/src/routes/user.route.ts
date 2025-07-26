import {
  activateUserHandler,
  deactivateUserHandler,
  getMeHandler,
  getUserProfileByHandleHandler,
} from '@/controllers/user.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import {
  GetUserProfileByHandleParamsDTOSchema,
  UserProfileDTOSchema,
} from '@/dtos/user-profile.dto';
import {
  ActivateUserBodyDTOSchema,
  DeactivateUserBodyDTOSchema,
  UserDTOSchema,
} from '@/dtos/user.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const userRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    {
      schema: {
        tags: ['v1', 'user'],
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
        response: {
          200: UserDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
      preHandler: [fastify.authenticate],
    },
    getMeHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().patch(
    '/activate',
    {
      schema: {
        tags: ['v1', 'user'],
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
        body: ActivateUserBodyDTOSchema,
        response: {
          200: UserDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          409: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    activateUserHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/deactivate',
    {
      schema: {
        tags: ['v1', 'user'],
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
        body: DeactivateUserBodyDTOSchema,
        response: {
          200: UserDTOSchema,
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
      preHandler: [fastify.authenticate],
    },
    deactivateUserHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:handle',
    {
      schema: {
        tags: ['v1', 'user'],
        params: GetUserProfileByHandleParamsDTOSchema,
        response: {
          200: UserProfileDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getUserProfileByHandleHandler
  );
  done();
};

export default userRoute;
