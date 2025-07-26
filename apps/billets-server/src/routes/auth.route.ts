import {
  confirmAuthCodeHandler,
  reissueTokenHandler,
  sendAuthCodeHandler,
  signinHandler,
  signinPreHandler,
  signupHandler,
  signupPreHandler,
} from '@/controllers/auth.controller';
import {
  ReissueTokenBodyDTOSchema,
  SignInBodyDTOSchema,
  SignUpBodyDTOSchema,
  UserWithAuthTokenDTOSchema,
} from '@/dtos/auth.dto';
import {
  ConfirmAuthCodeBodyDTOSchema,
  ConfirmAuthCodeResponseDTOSchema,
  SendAuthCodeResponseDTOSchema,
  SendEmailAuthCodeBodyDTOSchema,
} from '@/dtos/email-auth-request.dto';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const authRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/email/send-auth-code',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: SendEmailAuthCodeBodyDTOSchema,
        response: {
          200: SendAuthCodeResponseDTOSchema,
          409: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    sendAuthCodeHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/email/confirm-auth-code',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: ConfirmAuthCodeBodyDTOSchema,
        response: {
          200: ConfirmAuthCodeResponseDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          409: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    confirmAuthCodeHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/signin',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: SignInBodyDTOSchema,
        response: {
          200: UserWithAuthTokenDTOSchema,
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
      preHandler: [signinPreHandler],
    },
    signinHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/signup',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: SignUpBodyDTOSchema,
        response: {
          201: UserWithAuthTokenDTOSchema,
          400: ErrorResponseDTOSchema,
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
      preHandler: [signupPreHandler],
    },
    signupHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/reissue-token',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: ReissueTokenBodyDTOSchema,
        response: {
          201: UserWithAuthTokenDTOSchema,
          400: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    reissueTokenHandler
  );

  done();
};

export default authRoute;
