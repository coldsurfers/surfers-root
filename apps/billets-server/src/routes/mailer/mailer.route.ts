import { errorResponseSchema } from '@/lib/error'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { sendUserVoiceHandler } from './mailer.handler'
import { sendEmailResponseSchema, sendUserVoiceBodySchema } from './mailer.types'

export const mailerRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/user-voice',
    {
      schema: {
        tags: ['v1', 'mailer'],
        body: sendUserVoiceBodySchema,
        response: {
          200: sendEmailResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    sendUserVoiceHandler,
  )
  done()
}
