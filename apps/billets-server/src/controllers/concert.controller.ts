import type {
  ConcertDTO,
  ConcertDetailDTO,
  ConcertSearchQueryStringDTO,
  GetConcertByIdParamsDTO,
  GetConcertListQueryStringDTO,
} from '@/dtos/concert.dto';
import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import geohashUtils from '@/lib/geohashUtils';
import type { LatLng } from '@/lib/types';
import { ConcertDetailRepositoryImpl } from '@/repositories/concert-detail.repository.impl';
import { ConcertRepositoryImpl } from '@/repositories/concert.repository.impl';
import { ConcertDetailService } from '@/services/concert-detail.service';
import { ConcertService } from '@/services/concert.service';
import type { RouteGenericInterface } from 'fastify';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';

const concertRepository = new ConcertRepositoryImpl();
const concertService = new ConcertService(concertRepository);
const concertDetailRepository = new ConcertDetailRepositoryImpl();
const concertDetailService = new ConcertDetailService(concertDetailRepository);

export interface ConcertListRoute extends RouteGenericInterface {
  Querystring: GetConcertListQueryStringDTO;
  Reply: {
    200: ConcertDTO[];
    500: ErrorResponseDTO;
  };
}

/**
 * @TODO: remove, deprecated
 */
export const concertListHandler = async (
  req: FastifyRequest<ConcertListRoute>,
  rep: FastifyReply<ConcertListRoute>
) => {
  const { offset, size, latitude, longitude } = req.query;
  try {
    const latLng: LatLng | null =
      latitude && longitude
        ? {
            latitude: +latitude,
            longitude: +longitude,
          }
        : null;
    const geohash: string | null = latLng
      ? geohashUtils.generate(latLng.latitude, latLng.longitude, 3)
      : null;

    // @ts-ignore
    const concerts = await concertService.getMany({
      orderBy: 'latest',
      take: +size,
      skip: +offset,
      venueGeohash: geohash,
    });

    return rep.status(200).send(concerts);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface ConcertRoute extends RouteGenericInterface {
  Params: GetConcertByIdParamsDTO;
  Reply: {
    200: ConcertDetailDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const concertHandler = async (
  req: FastifyRequest<ConcertRoute>,
  rep: FastifyReply<ConcertRoute>
) => {
  const { id } = req.params;

  try {
    const concertDetail = await concertDetailService.getConcertDetailById(id);
    if (!concertDetail) {
      return rep.status(404).send({
        code: 'CONCERT_NOT_FOUND',
        message: 'concert not found',
      });
    }
    return rep.status(200).send(concertDetail);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface ConcertSearchRoute extends RouteGenericInterface {
  Querystring: ConcertSearchQueryStringDTO;
  Reply: {
    200: ConcertDTO[];
    500: ErrorResponseDTO;
  };
}

/**
 * @TODO: remove, deprecated
 */
export const concertSearchHandler = async (
  req: FastifyRequest<ConcertSearchRoute>,
  rep: FastifyReply<ConcertSearchRoute>
) => {
  const { keyword, offset, size } = req.query;
  try {
    // @ts-ignore
    const concerts = await concertService.getMany({
      titleContains: keyword,
      orderBy: 'latest',
      take: +size,
      skip: +offset,
      venueGeohash: null,
    });
    return rep.status(200).send(concerts);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
