import { sendUserVoiceHandler } from '@/controllers/mailer.controller'
import { errorResponseSchema } from '@/lib/error'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { sendEmailResponseSchema, sendUserVoiceBodySchema } from './mailer.types'

const timeWindow = '1 minute'

export const mailerRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/user-voice',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow,
          keyGenerator: (req) => req.ip,
          ban: 2,
          errorResponseBuilder(req, context) {
            return {
              statusCode: 429,
              error: 'Too Many Requests',
              message: `You have exceeded the request limit of ${context.max} per ${timeWindow}`,
            }
          },
        },
      },
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
