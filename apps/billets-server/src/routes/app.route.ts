import { getAppUpdateInfoHandler } from '@/controllers/app-update-info.controller';
import { getRemoteAppManifestHandler } from '@/controllers/remote-app-manifest.controller';
import { AppUpdateInfoDTOSchema } from '@/dtos/app-update-info.dto';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import { RemoteAppManifestDTOSchema } from '@/dtos/remote-app-manifest.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const appRoute: FastifyPluginCallback = (fastify, _, done) => {
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
    getAppUpdateInfoHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/remote-app-manifest',
    {
      schema: {
        tags: ['v1', 'app'],
        response: {
          200: RemoteAppManifestDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getRemoteAppManifestHandler
  );
  done();
};

export default appRoute;
