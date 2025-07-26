import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { RemoteAppManifestDTO } from '@/dtos/remote-app-manifest.dto';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

interface GetRemoteAppManifestRoute extends RouteGenericInterface {
  Reply: {
    200: RemoteAppManifestDTO;
    500: ErrorResponseDTO;
  };
}

export const getRemoteAppManifestHandler = async (
  _: FastifyRequest<GetRemoteAppManifestRoute>,
  rep: FastifyReply<GetRemoteAppManifestRoute>
) => {
  try {
    return rep.status(200).send({
      settings: {
        latestVersion: '1.0.1',
      },
    });
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
