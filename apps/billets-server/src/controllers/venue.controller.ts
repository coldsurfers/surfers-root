import { ConcertDTO } from '@/dtos/concert.dto'
import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import {
  GetConcertListByVenueIdParamsDTO,
  GetConcertListByVenueIdQueryString,
  GetVenueByIdParamsDTO,
  VenueDTO,
} from '@/dtos/venue.dto'
import { ConcertRepositoryImpl } from '@/repositories/concert.repository.impl'
import { VenueRepositoryImpl } from '@/repositories/venue.repository.impl'
import { ConcertService } from '@/services/concert.service'
import { VenueService } from '@/services/venue.service'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

const venueRepository = new VenueRepositoryImpl()
const venueService = new VenueService(venueRepository)

const concertRepository = new ConcertRepositoryImpl()
const concertService = new ConcertService(concertRepository)

interface GetVenueByIdRoute extends RouteGenericInterface {
  Params: GetVenueByIdParamsDTO
  Reply: {
    200: VenueDTO
    404: ErrorResponseDTO
    500: ErrorResponseDTO
  }
}

export const getVenueByIdHandler = async (
  req: FastifyRequest<GetVenueByIdRoute>,
  rep: FastifyReply<GetVenueByIdRoute>,
) => {
  try {
    const { id: venueId } = req.params
    const venue = await venueService.getVenueById(venueId)
    if (!venue) {
      return rep.status(404).send({
        code: 'VENUE_NOT_FOUND',
        message: 'Venue not found',
      })
    }
    return rep.status(200).send(venue)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

interface GetConcertListByVenueIdRoute extends RouteGenericInterface {
  Params: GetConcertListByVenueIdParamsDTO
  Querystring: GetConcertListByVenueIdQueryString
  Reply: {
    200: ConcertDTO[]
    500: ErrorResponseDTO
  }
}

export const getConcertListByVenueIdHandler = async (
  req: FastifyRequest<GetConcertListByVenueIdRoute>,
  rep: FastifyReply<GetConcertListByVenueIdRoute>,
) => {
  try {
    const { venueId } = req.params
    const { offset, size } = req.query
    const concerts = await concertService.getManyByVenueId({
      venueId,
      orderBy: 'latest',
      take: +size,
      skip: +offset,
    })
    return rep.status(200).send(concerts)
  } catch (e) {
    return rep.status(500).send()
  }
}
