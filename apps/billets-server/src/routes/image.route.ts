import { getImageResizeHandler, uploadImageHandler } from '@/controllers/image.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import {
  GetImageResizeQueryStringDTOSchema,
  UploadImageBodyDTOSchema,
  UploadImageResponseDTOSchema,
} from '@/dtos/image.dto';
import type { FastifyPluginCallback } from 'fastify';
import { z } from 'zod';

const imageRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['v1', 'image'],
        querystring: GetImageResizeQueryStringDTOSchema,
        response: {
          200: z.instanceof(Buffer),
          304: z.instanceof(Buffer),
          400: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getImageResizeHandler
  );
  if (process.env.NODE_ENV === 'development') {
    fastify.post(
      '/',
      {
        schema: {
          tags: ['v1', 'image'],
          body: UploadImageBodyDTOSchema,
          response: {
            200: UploadImageResponseDTOSchema,
            500: ErrorResponseDTOSchema,
          },
        },
      },
      uploadImageHandler
    );
  }

  done();
};

export default imageRoute;
