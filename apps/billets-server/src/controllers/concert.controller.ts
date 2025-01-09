import { ConcertDTO } from '@/dtos/concert-dto'
import { LatLng } from '@/lib/types'
import { concertList, concertSearchList } from '@/routes/concert/concert.service'
import {
  ConcertDetailParams,
  ConcertDetailResponse,
  ConcertListQueryString,
  ConcertListResponse,
  ConcertSearchParams,
  ConcertSearchResponse,
} from '@/routes/concert/concert.types'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

export interface ConcertListRoute extends RouteGenericInterface {
  Querystring: ConcertListQueryString
  Reply: {
    200: ConcertListResponse
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
    const list = await concertList({
      orderBy: 'latest',
      offset: +offset,
      size: +size,
      latLng,
    })

    const response = list.map((value) => value.serialize())
    return rep.status(200).send(response)
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

interface ConcertRoute extends RouteGenericInterface {
  Params: ConcertDetailParams
  Reply: {
    200: ConcertDetailResponse
    404: void
    500: void
  }
}

export const concertHandler = async (req: FastifyRequest<ConcertRoute>, rep: FastifyReply<ConcertRoute>) => {
  const { id } = req.params

  try {
    const dto = await ConcertDTO.findById(id)
    if (!dto) {
      return rep.status(404).send()
    }
    const response = dto.serialize()
    return rep.status(200).send(response)
  } catch (e) {
    return rep.status(500).send()
  }
}

interface ConcertSearchRoute extends RouteGenericInterface {
  Querystring: ConcertSearchParams
  Reply: {
    200: ConcertSearchResponse
    500: void
  }
}

export const concertSearchHandler = async (
  req: FastifyRequest<ConcertSearchRoute>,
  rep: FastifyReply<ConcertSearchRoute>,
) => {
  const { keyword, offset, size } = req.query
  try {
    const list = await concertSearchList({
      titleKeyword: keyword,
      orderBy: 'latest',
      offset: +offset,
      size: +size,
    })
    const response = list.map((value) => value.serialize())
    return rep.status(200).send(response)
  } catch (e) {
    return rep.status(500).send()
  }
}
