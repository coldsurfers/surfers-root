import ConcertDTO from '@/dtos/ConcertDTO'
import VenueDTO from '@/dtos/VenueDTO'
import { venueDTOSerializedSchema } from '@/dtos/VenueDTO.types'
import { RouteHandler } from 'fastify'
import { z } from 'zod'
import {
  getConcertListByVenueIdParamsSchema,
  getConcertListByVenueIdQueryStringSchema,
  getConcertListByVenueIdSuccessResponseSchema,
  getVenueByIdParamsSchema,
} from './venue.types'

export const getVenueByIdRoute: RouteHandler<{
  Params: z.infer<typeof getVenueByIdParamsSchema>
  Reply: {
    200: z.infer<typeof venueDTOSerializedSchema>
    404: void
    500: void
  }
}> = async (req, rep) => {
  try {
    const { id: venueId } = req.params
    const venue = await VenueDTO.findById(venueId)
    if (!venue) {
      return rep.status(404).send()
    }
    const venueSerialized = venue.serialize()
    return rep.status(200).send(venueSerialized)
  } catch (e) {
    return rep.status(500).send()
  }
}

export const getConcertListByVenueIdRoute: RouteHandler<{
  Querystring: z.infer<typeof getConcertListByVenueIdQueryStringSchema>
  Params: z.infer<typeof getConcertListByVenueIdParamsSchema>
  Reply: {
    200: z.infer<typeof getConcertListByVenueIdSuccessResponseSchema>
    500: void
  }
}> = async (req, rep) => {
  try {
    const { venueId } = req.params
    const { offset, size } = req.query
    const dtos = await ConcertDTO.listByVenueId(venueId, {
      orderBy: 'latest',
      take: +size,
      skip: +offset,
    })
    return rep.status(200).send(dtos.map((dto) => dto.serialize()))
  } catch (e) {
    return rep.status(500).send()
  }
}
