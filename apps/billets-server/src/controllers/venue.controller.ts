import { VenueDTO } from '@/dtos/venue.dto'
import { ConcertRepositoryImpl } from '@/repositories/concert.repository.impl'
import { VenueRepositoryImpl } from '@/repositories/venue.repository.impl'
import {
  getConcertListByVenueIdParamsSchema,
  getConcertListByVenueIdQueryStringSchema,
  getConcertListByVenueIdSuccessResponseSchema,
  getVenueByIdParamsSchema,
} from '@/routes/venue/venue.types'
import { ConcertService } from '@/services/concert.service'
import { VenueService } from '@/services/venue.service'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { z } from 'zod'

const venueRepository = new VenueRepositoryImpl()
const venueService = new VenueService(venueRepository)

const concertRepository = new ConcertRepositoryImpl()
const concertService = new ConcertService(concertRepository)

interface GetVenueByIdRoute extends RouteGenericInterface {
  Params: z.infer<typeof getVenueByIdParamsSchema>
  Reply: {
    200: VenueDTO
    404: void
    500: void
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
      return rep.status(404).send()
    }
    return rep.status(200).send(venue)
  } catch (e) {
    return rep.status(500).send()
  }
}

interface GetConcertListByVenueIdRoute extends RouteGenericInterface {
  Querystring: z.infer<typeof getConcertListByVenueIdQueryStringSchema>
  Params: z.infer<typeof getConcertListByVenueIdParamsSchema>
  Reply: {
    200: z.infer<typeof getConcertListByVenueIdSuccessResponseSchema>
    500: void
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
