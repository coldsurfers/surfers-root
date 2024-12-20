import { fcmTokenDTOSerializedSchema } from '@/dtos/fcm-token-dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { postFCMTokenHandler } from './fcm.handler'
import { postFCMTokenBodySchema } from './fcm.types'

export const fcmRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/token',
    {
      schema: {
        tags: ['v1', 'fcm'],
        body: postFCMTokenBodySchema,
        response: {
          201: fcmTokenDTOSerializedSchema,
        },
      },
    },
    postFCMTokenHandler,
  )
  done()
}
