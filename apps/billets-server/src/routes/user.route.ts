import { activateUserHandler, deactivateUserHandler, getMeHandler } from '@/controllers/user.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { ActivateUserBodyDTOSchema, DeactivateUserBodyDTOSchema, UserDTOSchema } from '@/dtos/user.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
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
    getMeHandler,
  )
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
    activateUserHandler,
  )
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
    deactivateUserHandler,
  )
  done()
}

export default userRoute
