import { LocationCityDTO, locationCityDTOSerializedSchema } from '@/dtos/location-city-dto'
import { LocationConcertDTO, locationConcertDTOSerializedSchema } from '@/dtos/location-concert-dto'
import { LocationCountryDTO } from '@/dtos/location-country-dto/location-country-dto'
import { locationCountryDTOSerializedSchema } from '@/dtos/location-country-dto/location-country-dto.types'
import { errorResponseSchema } from '@/lib/error'
import { getLocationConcertsQueryStringSchema } from '@/routes/location/location.types'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import geohash from 'ngeohash'
import { z } from 'zod'

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
    200: z.infer<typeof locationConcertDTOSerializedSchema>[]
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
    const data = await LocationConcertDTO.listByGeohashes(geohashes)

    return rep.status(200).send(data.map((value) => value.serialize()))
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
    200: z.infer<typeof locationCityDTOSerializedSchema>[]
    500: z.infer<typeof errorResponseSchema>
  }
}

export const getLocationCityListHandler = async (
  req: FastifyRequest<GetLocationCityListRoute>,
  rep: FastifyReply<GetLocationCityListRoute>,
) => {
  try {
    const data = await LocationCityDTO.listCity()
    return rep.status(200).send(data.map((value) => value.serialize()))
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
    200: z.infer<typeof locationCountryDTOSerializedSchema>[]
    500: z.infer<typeof errorResponseSchema>
  }
}

export const getLocationCountryListHandler = async (
  req: FastifyRequest<GetLocationCountryListRoute>,
  rep: FastifyReply<GetLocationCountryListRoute>,
) => {
  try {
    const data = await LocationCountryDTO.listCountry()
    return rep.status(200).send(data.map((value) => value.serialize()))
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
