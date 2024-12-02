import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userDTOSerializedSchema } from '../dtos/UserDTO.types'
import { errorResponseSchema } from '../lib/error'
import { deactivateUserHandler, getMeHandler } from './user.handler'
import { getMeResponseSchema } from './user.types'

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
        },
      },
    },
    getMeHandler,
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
