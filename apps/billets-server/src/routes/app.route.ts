import { getAppUpdateInfoHandler } from '@/controllers/app-update-info.controller'
import { AppUpdateInfoDTOSchema } from '@/dtos/app-update-info.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const appRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/update-info',
    {
      schema: {
        tags: ['v1', 'app'],
        response: {
          200: AppUpdateInfoDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getAppUpdateInfoHandler,
  )
  done()
}

export default appRoute
