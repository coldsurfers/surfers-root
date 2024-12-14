import { LocationConcertDTO, locationConcertDTOSerializedSchema } from '@/dtos/location-concert-dto'
import { errorResponseSchema } from '@/lib/error'
import { RouteHandler } from 'fastify'
import geohash from 'ngeohash'
import { z } from 'zod'
import { getLocationConcertsQueryStringSchema } from './location.types'

const getLocationConcertsHandlerQueryAdapter = (query: z.infer<typeof getLocationConcertsQueryStringSchema>) => {
  return {
    latitude: +query.latitude,
    longitude: +query.longitude,
    latitudeDelta: +query.latitudeDelta,
    longitudeDelta: +query.longitudeDelta,
    zoomLevel: +query.zoomLevel,
  }
}

export const getLocationConcertsHandler: RouteHandler<{
  Querystring: z.infer<typeof getLocationConcertsQueryStringSchema>
  Reply: {
    200: z.infer<typeof locationConcertDTOSerializedSchema>[]
    400: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
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
    const precision = Math.max(1, Math.min(12, Math.floor(zoomLevel / 2)))

    // Calculate the corners of the visible region
    const northLat = latitude + latitudeDelta / 2
    const southLat = latitude - latitudeDelta / 2
    const westLng = longitude - longitudeDelta / 2
    const eastLng = longitude + longitudeDelta / 2

    // Get geohashes for the corners
    const northEast = geohash.encode(northLat, eastLng, precision)
    const northWest = geohash.encode(northLat, westLng, precision)
    const southEast = geohash.encode(southLat, eastLng, precision)
    const southWest = geohash.encode(southLat, westLng, precision)
    const center = geohash.encode(latitude, longitude, precision)

    const geohashes = [...new Set([northEast, northWest, southEast, southWest, center])]
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
