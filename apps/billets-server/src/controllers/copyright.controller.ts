import type {
  CopyrightDTO,
  GetCopyrightByArtistProfileImageIdParamsDTO,
} from '@/dtos/copyright.dto';
import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import { CopyrightRepositoryImpl } from '@/repositories/copyright.repository.impl';
import { CopyrightService } from '@/services/copyright.service';
import type { RouteGenericInterface } from 'fastify';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';

const copyrightRepository = new CopyrightRepositoryImpl();
const copyrightService = new CopyrightService(copyrightRepository);

interface GetCopyrightByArtistProfileImageIdRoute extends RouteGenericInterface {
  Params: GetCopyrightByArtistProfileImageIdParamsDTO;
  Reply: {
    200: CopyrightDTO | null;
    500: ErrorResponseDTO;
  };
}

export const getCopyrightByArtistProfileImageIdHandler = async (
  req: FastifyRequest<GetCopyrightByArtistProfileImageIdRoute>,
  rep: FastifyReply<GetCopyrightByArtistProfileImageIdRoute>
) => {
  try {
    const data = await copyrightService.findByArtistProfileImageId(req.params.artistProfileImageId);
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
