import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { GetPosterDetailByPosterIdParamsDTO, PosterDetailDTO } from '@/dtos/poster-detail.dto';
import type { GetPostersByEventIdQueryStringDTO, PosterDTO } from '@/dtos/poster.dto';
import { PosterRepositoryImpl } from '@/repositories/poster.repository.impl';
import { PosterService } from '@/services/poster.service';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

const posterRepository = new PosterRepositoryImpl();
const posterService = new PosterService(posterRepository);

interface GetPosterByEventIdRoute extends RouteGenericInterface {
  Querystring: GetPostersByEventIdQueryStringDTO;
  Reply: {
    200: PosterDTO[];
    500: ErrorResponseDTO;
  };
}

export const getPostersByEventIdHandler = async (
  req: FastifyRequest<GetPosterByEventIdRoute>,
  rep: FastifyReply<GetPosterByEventIdRoute>
) => {
  try {
    const { eventId } = req.query;
    const data = await posterService.getPosters({ eventId });
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface GetPosterDetailByPosterIdRoute extends RouteGenericInterface {
  Params: GetPosterDetailByPosterIdParamsDTO;
  Reply: {
    200: PosterDetailDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getPosterDetailByPosterIdHandler = async (
  req: FastifyRequest<GetPosterDetailByPosterIdRoute>,
  rep: FastifyReply<GetPosterDetailByPosterIdRoute>
) => {
  try {
    const { posterId } = req.params;
    const data = await posterService.getPosterDetail({ posterId });
    if (!data) {
      return rep.status(404).send({
        code: 'POSTER_NOT_FOUND',
        message: 'poster not found',
      });
    }
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
