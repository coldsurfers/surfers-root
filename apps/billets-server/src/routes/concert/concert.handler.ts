import { ConcertDTO } from '@/dtos/concert-dto'
import { LatLng } from '@/lib/types'
import { RouteHandler } from 'fastify'
import { concertList, concertSearchList } from './concert.service'
import {
  ConcertDetailParams,
  ConcertDetailResponse,
  ConcertListQueryString,
  ConcertListResponse,
  ConcertSearchParams,
  ConcertSearchResponse,
} from './concert.types'

export const concertListHandler: RouteHandler<{
  Querystring: ConcertListQueryString
  Reply: {
    200: ConcertListResponse
    500: void
  }
}> = async (req, rep) => {
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

export const concertHandler: RouteHandler<{
  Params: ConcertDetailParams
  Reply: {
    200: ConcertDetailResponse
    404: void
    500: void
  }
}> = async (req, rep) => {
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

export const concertSearchHandler: RouteHandler<{
  Querystring: ConcertSearchParams
  Reply: {
    200: ConcertSearchResponse
    500: void
  }
}> = async (req, rep) => {
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
