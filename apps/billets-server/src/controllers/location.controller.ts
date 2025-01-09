import { LocationCityDTOSchema, LocationConcertDTOSchema, LocationCountryDTOSchema } from '@/dtos/location.dto'
import { errorResponseSchema } from '@/lib/error'
import { LocationRepositoryImpl } from '@/repositories/location.repository.impl'
import { getLocationConcertsQueryStringSchema } from '@/routes/location/location.types'
import { LocationService } from '@/services/location.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import geohash from 'ngeohash'
import { z } from 'zod'

const locationRepository = new LocationRepositoryImpl()
const locationService = new LocationService(locationRepository)

const getLocationConcertsHandlerQueryAdapter = (query: z.infer<typeof getLocationConcertsQueryStringSchema>) => {
  return {
    latitude: +query.latitude,
    longitude: +query.longitude,
    latitudeDelta: +query.latitudeDelta,
    longitudeDelta: +query.longitudeDelta,
    zoomLevel: +query.zoomLevel,
  }
}

interface GetLocationConcertRoute extends RouteGenericInterface {
  Querystring: z.infer<typeof getLocationConcertsQueryStringSchema>
  Reply: {
    200: z.infer<typeof LocationConcertDTOSchema>[]
    400: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const getLocationConcertsHandler = async (
  req: FastifyRequest<GetLocationConcertRoute>,
  rep: FastifyReply<GetLocationConcertRoute>,
) => {
  try {
    const queryStringValidation = getLocationConcertsQueryStringSchema.safeParse(req.query)
    if (!queryStringValidation.success) {
      return rep.status(400).send({
        code: 'INVALID_QUERY_STRING',
        message: 'invalid query string',
      })
    }
    const { latitude, longitude, latitudeDelta, longitudeDelta, zoomLevel } = getLocationConcertsHandlerQueryAdapter(
      queryStringValidation.data,
    )
    const calculatedPrecision = Math.max(1, Math.min(12, Math.floor(zoomLevel / 2)))
    const maxPrecision = calculatedPrecision >= 5 ? 5 : calculatedPrecision

    // Calculate the corners of the visible region
    const northLat = latitude + latitudeDelta / 2
    const southLat = latitude - latitudeDelta / 2
    const westLng = longitude - longitudeDelta / 2
    const eastLng = longitude + longitudeDelta / 2

    // Get geohashes for the corners
    const northEast = geohash.encode(northLat, eastLng, maxPrecision)
    const northWest = geohash.encode(northLat, westLng, maxPrecision)
    const southEast = geohash.encode(southLat, eastLng, maxPrecision)
    const southWest = geohash.encode(southLat, westLng, maxPrecision)
    const center = geohash.encode(latitude, longitude, maxPrecision)
    const nearbyGeohashes = geohash.neighbors(center)
    const bboxes = geohash.bboxes(southLat, westLng, northLat, eastLng, maxPrecision)

    const geohashes = [...new Set([northEast, northWest, southEast, southWest, center, ...nearbyGeohashes, ...bboxes])]
    const data = await locationService.findAllConcertsByGeohashes(geohashes)

    return rep.status(200).send(data)
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

interface GetLocationCityListRoute extends RouteGenericInterface {
  Reply: {
    200: z.infer<typeof LocationCityDTOSchema>[]
    500: z.infer<typeof errorResponseSchema>
  }
}

export const getLocationCityListHandler = async (
  req: FastifyRequest<GetLocationCityListRoute>,
  rep: FastifyReply<GetLocationCityListRoute>,
) => {
  try {
    const data = await locationService.findAllCity()
    return rep.status(200).send(data)
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

interface GetLocationCountryListRoute extends RouteGenericInterface {
  Reply: {
    200: z.infer<typeof LocationCountryDTOSchema>[]
    500: z.infer<typeof errorResponseSchema>
  }
}

export const getLocationCountryListHandler = async (
  req: FastifyRequest<GetLocationCountryListRoute>,
  rep: FastifyReply<GetLocationCountryListRoute>,
) => {
  try {
    const data = await locationService.findAllCountry()
    return rep.status(200).send(data)
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
