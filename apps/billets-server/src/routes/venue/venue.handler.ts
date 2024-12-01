import { RouteHandler } from 'fastify'
import { z } from 'zod'
import VenueDTO from '../../dtos/VenueDTO'
import { venueDTOSerializedSchema } from '../../dtos/VenueDTO.types'
import { getVenueByIdParamsSchema } from './venue.types'

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

export const getConcertListByVenueIdRoute: RouteHandler<{}> = async (req, rep) => {}
