import { getPricesByTicketIdHandler } from '@/controllers/price.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import { GetPricesByTicketIdQueryStringDTOSchema, PriceDTOSchema } from '@/dtos/price.dto';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { FastifyPluginCallback } from 'fastify/types/plugin';

const priceRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'price'],
        querystring: GetPricesByTicketIdQueryStringDTOSchema,
        response: {
          200: PriceDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getPricesByTicketIdHandler
  );
  done();
};

export default priceRoute;
