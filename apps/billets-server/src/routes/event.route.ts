import { getEventDetailByIdHandler, getEventsHandler } from '@/controllers/event.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import {
  EventDetailDTOSchema,
  EventDTOSchema,
  GetEventDetailByIdParamsDTOSchema,
  GetEventsQueryStringDTOSchema,
} from '@/dtos/event.dto'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyPluginCallback } from 'fastify/types/plugin'

const eventRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'event'],
        querystring: GetEventsQueryStringDTOSchema,
        response: {
          200: EventDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getEventsHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:eventId',
    {
      schema: {
        tags: ['v1', 'event'],
        params: GetEventDetailByIdParamsDTOSchema,
        response: {
          200: EventDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getEventDetailByIdHandler,
  )
  done()
}

export default eventRoute
