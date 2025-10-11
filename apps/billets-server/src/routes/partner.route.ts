import { sendPartnerContactFormHandler } from '@/controllers/partner.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import {
  PartnerContactFormDTOSchema,
  SendPartnerContactFormResponseDTOSchema,
} from '@/dtos/partner.dto';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { FastifyPluginCallback } from 'fastify/types/plugin';

const timeWindow = '1 minute';

const partnerRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow,
          keyGenerator: (req) => req.ip,
          ban: 2,
          errorResponseBuilder(_, context) {
            return {
              statusCode: 429,
              error: 'Too Many Requests',
              message: `You have exceeded the request limit of ${context.max} per ${timeWindow}`,
            };
          },
        },
      },
      schema: {
        tags: ['v1', 'partner'],
        body: PartnerContactFormDTOSchema,
        response: {
          200: SendPartnerContactFormResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    sendPartnerContactFormHandler
  );

  done();
};

export default partnerRoute;
