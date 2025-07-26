import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import {
  type GetLocationConcertsQueryStringDTO,
  GetLocationConcertsQueryStringDTOSchema,
  type LocationCityDTO,
  type LocationConcertDTO,
  type LocationCountryDTO,
} from '@/dtos/location.dto';
import { LocationRepositoryImpl } from '@/repositories/location.repository.impl';
import { LocationService } from '@/services/location.service';
import type { RouteGenericInterface } from 'fastify';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';
import geohash from 'ngeohash';
import type { z } from 'zod';

const locationRepository = new LocationRepositoryImpl();
const locationService = new LocationService(locationRepository);

const getLocationConcertsHandlerQueryAdapter = (
  query: z.infer<typeof GetLocationConcertsQueryStringDTOSchema>
) => {
  return {
    latitude: +query.latitude,
    longitude: +query.longitude,
    latitudeDelta: +query.latitudeDelta,
    longitudeDelta: +query.longitudeDelta,
    zoomLevel: +query.zoomLevel,
  };
};

interface GetLocationConcertRoute extends RouteGenericInterface {
  Querystring: GetLocationConcertsQueryStringDTO;
  Reply: {
    200: LocationConcertDTO[];
    400: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getLocationConcertsHandler = async (
  req: FastifyRequest<GetLocationConcertRoute>,
  rep: FastifyReply<GetLocationConcertRoute>
) => {
  try {
    const queryStringValidation = GetLocationConcertsQueryStringDTOSchema.safeParse(req.query);
    if (!queryStringValidation.success) {
      return rep.status(400).send({
        code: 'INVALID_QUERY_STRING',
        message: 'invalid query string',
      });
    }
    const { latitude, longitude, latitudeDelta, longitudeDelta, zoomLevel } =
      getLocationConcertsHandlerQueryAdapter(queryStringValidation.data);
    const calculatedPrecision = Math.max(1, Math.min(12, Math.floor(zoomLevel / 2)));
    const maxPrecision = calculatedPrecision >= 5 ? 5 : calculatedPrecision;

    // Calculate the corners of the visible region
    const northLat = latitude + latitudeDelta / 2;
    const southLat = latitude - latitudeDelta / 2;
    const westLng = longitude - longitudeDelta / 2;
    const eastLng = longitude + longitudeDelta / 2;

    // Get geohashes for the corners
    const northEast = geohash.encode(northLat, eastLng, maxPrecision);
    const northWest = geohash.encode(northLat, westLng, maxPrecision);
    const southEast = geohash.encode(southLat, eastLng, maxPrecision);
    const southWest = geohash.encode(southLat, westLng, maxPrecision);
    const center = geohash.encode(latitude, longitude, maxPrecision);
    const nearbyGeohashes = geohash.neighbors(center);
    const bboxes = geohash.bboxes(southLat, westLng, northLat, eastLng, maxPrecision);

    const geohashes = [
      ...new Set([
        northEast,
        northWest,
        southEast,
        southWest,
        center,
        ...nearbyGeohashes,
        ...bboxes,
      ]),
    ];
    const data = await locationService.findAllConcertsByGeohashes(geohashes);

    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface GetLocationCityListRoute extends RouteGenericInterface {
  Reply: {
    200: LocationCityDTO[];
    500: ErrorResponseDTO;
  };
}

export const getLocationCityListHandler = async (
  _: FastifyRequest<GetLocationCityListRoute>,
  rep: FastifyReply<GetLocationCityListRoute>
) => {
  try {
    const data = await locationService.findAllCity();
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface GetLocationCountryListRoute extends RouteGenericInterface {
  Reply: {
    200: LocationCountryDTO[];
    500: ErrorResponseDTO;
  };
}

export const getLocationCountryListHandler = async (
  _: FastifyRequest<GetLocationCountryListRoute>,
  rep: FastifyReply<GetLocationCountryListRoute>
) => {
  try {
    const data = await locationService.findAllCountry();
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
