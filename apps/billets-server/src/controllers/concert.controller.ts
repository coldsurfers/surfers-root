import {
  ConcertDTO,
  ConcertSearchQueryStringDTO,
  GetConcertByIdParamsDTO,
  GetConcertListQueryStringDTO,
} from '@/dtos/concert.dto'
import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import geohashUtils from '@/lib/geohashUtils'
import { LatLng } from '@/lib/types'
import { ConcertRepositoryImpl } from '@/repositories/concert.repository.impl'
import { ConcertService } from '@/services/concert.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

const concertRepository = new ConcertRepositoryImpl()
const concertService = new ConcertService(concertRepository)

export interface ConcertListRoute extends RouteGenericInterface {
  Querystring: GetConcertListQueryStringDTO
  Reply: {
    200: ConcertDTO[]
    500: void
  }
}

export const concertListHandler = async (
  req: FastifyRequest<ConcertListRoute>,
  rep: FastifyReply<ConcertListRoute>,
) => {
  const { offset, size, latitude, longitude } = req.query
  try {
    const latLng: LatLng | null =
      latitude && longitude
        ? {
            latitude: +latitude,
            longitude: +longitude,
          }
        : null
    const geohash: string | null = latLng ? geohashUtils.generate(latLng.latitude, latLng.longitude, 3) : null

    const concerts = await concertService.getMany({
      orderBy: 'latest',
      take: +size,
      skip: +offset,
      venueGeohash: geohash,
    })

    return rep.status(200).send(concerts)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

interface ConcertRoute extends RouteGenericInterface {
  Params: GetConcertByIdParamsDTO
  Reply: {
    200: ConcertDTO
    404: void
    500: void
  }
}

export const concertHandler = async (req: FastifyRequest<ConcertRoute>, rep: FastifyReply<ConcertRoute>) => {
  const { id } = req.params

  try {
    const concert = await concertService.getById(id)
    if (!concert) {
      return rep.status(404).send()
    }
    return rep.status(200).send(concert)
  } catch (e) {
    return rep.status(500).send()
  }
}

interface ConcertSearchRoute extends RouteGenericInterface {
  Querystring: ConcertSearchQueryStringDTO
  Reply: {
    200: ConcertDTO[]
    500: ErrorResponseDTO
  }
}

export const concertSearchHandler = async (
  req: FastifyRequest<ConcertSearchRoute>,
  rep: FastifyReply<ConcertSearchRoute>,
) => {
  const { keyword, offset, size } = req.query
  try {
    const concerts = await concertService.getMany({
      titleContains: keyword,
      orderBy: 'latest',
      take: +size,
      skip: +offset,
      venueGeohash: null,
    })
    return rep.status(200).send(concerts)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
