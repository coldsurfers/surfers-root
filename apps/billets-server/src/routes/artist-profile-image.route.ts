import {
  GetArtistProfileImageDetailHandler,
  getArtistProfileImagesByArtistIdHandler,
} from '@/controllers/artist-profile-image.controller';
import {
  ArtistProfileImageDetailDTOSchema,
  GetArtistProfileImageDetailParamsDTOSchema,
} from '@/dtos/artist-profile-image-detail.dto';
import {
  ArtistProfileImageDTOSchema,
  GetArtistProfileImagesByArtistIdQueryStringDTOSchema,
} from '@/dtos/artist-profile-image.dto';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { FastifyPluginCallback } from 'fastify/types/plugin';

const artistProfileImageRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'artist-profile-image'],
        querystring: GetArtistProfileImagesByArtistIdQueryStringDTOSchema,
        response: {
          200: ArtistProfileImageDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getArtistProfileImagesByArtistIdHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:artistProfileImageId',
    {
      schema: {
        tags: ['v1', 'artist-profile-image'],
        params: GetArtistProfileImageDetailParamsDTOSchema,
        response: {
          200: ArtistProfileImageDetailDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    GetArtistProfileImageDetailHandler
  );
  done();
};

export default artistProfileImageRoute;
