import { getTicketsByEventIdHandler } from '@/controllers/ticket.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import { GetTicketsByEventIdQueryStringDTOSchema, TicketDTOSchema } from '@/dtos/ticket.dto';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { FastifyPluginCallback } from 'fastify/types/plugin';

const ticketRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'ticket'],
        querystring: GetTicketsByEventIdQueryStringDTOSchema,
        response: {
          200: TicketDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getTicketsByEventIdHandler
  );
  done();
};

export default ticketRoute;
