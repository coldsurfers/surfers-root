import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getMeHandler } from './user.handler'
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
  done()
}

export default userRoute
