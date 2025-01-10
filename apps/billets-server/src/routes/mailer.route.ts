import { sendUserVoiceHandler } from '@/controllers/mailer.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { SendEmailResponseDTOSchema, SendUserVoiceBodyDTOSchema } from '@/dtos/mailer.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const timeWindow = '1 minute'

const mailerRoute: FastifyPluginCallback = (fastify, opts, done) => {
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
        body: SendUserVoiceBodyDTOSchema,
        response: {
          200: SendEmailResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    sendUserVoiceHandler,
  )
  done()
}

export default mailerRoute
