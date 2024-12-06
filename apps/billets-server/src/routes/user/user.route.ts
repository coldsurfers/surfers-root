import { userDTOSerializedSchema } from '@/dtos/UserDTO.types'
import { errorResponseSchema } from '@/lib/error'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { activateUserHandler, deactivateUserHandler, getMeHandler } from './user.handler'
import { activateUserBodySchema, deactivateUserBodySchema, getMeResponseSchema } from './user.types'

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
          200: getMeResponseSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
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
        body: activateUserBodySchema,
        response: {
          200: userDTOSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
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
        body: deactivateUserBodySchema,
        response: {
          200: userDTOSerializedSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    deactivateUserHandler,
  )
  done()
}

export default userRoute
