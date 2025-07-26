import { getArtistByIdHandler } from '@/controllers/artist.controller';
import { ArtistDetailDTOSchema } from '@/dtos/artist-detail.dto';
import { GetArtistByIdParamsDTOSchema } from '@/dtos/artist.dto';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const artistRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'artist'],
        params: GetArtistByIdParamsDTOSchema,
        response: {
          200: ArtistDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getArtistByIdHandler
  );
  done();
};

export default artistRoute;
