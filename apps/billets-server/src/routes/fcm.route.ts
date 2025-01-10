import { postFCMTokenHandler } from '@/controllers/fcm.controller'
import { FCMTokenDTOSchema, PostFCMTokenBodyDTOSchema } from '@/dtos/fcm-token.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const fcmRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/token',
    {
      schema: {
        tags: ['v1', 'fcm'],
        body: PostFCMTokenBodyDTOSchema,
        response: {
          201: FCMTokenDTOSchema,
        },
      },
    },
    postFCMTokenHandler,
  )
  done()
}

export default fcmRoute
