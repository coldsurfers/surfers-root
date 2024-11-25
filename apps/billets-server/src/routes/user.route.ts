import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getMeHandler, postFCMTokenHandler } from './user.handler'
import { getMeResponseSchema, postFCMTokenBodySchema, postFCMTokenResponseSchema } from './user.types'

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
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/fcm-token',
    {
      schema: {
        tags: ['v1', 'user'],
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
        body: postFCMTokenBodySchema,
        response: {
          201: postFCMTokenResponseSchema,
        },
      },
    },
    postFCMTokenHandler,
  )
  done()
}

export default userRoute
