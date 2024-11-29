import { RouteHandler } from 'fastify'
import { z } from 'zod'
import { getVenueByIdParamsSchema } from './venue.types'

export const getVenueByIdRoute: RouteHandler<{
  Params: z.infer<typeof getVenueByIdParamsSchema>
  Reply: {
    500: void
  }
}> = async (req, rep) => {
  try {
    const { id: venueId } = req.params
  } catch (e) {
    return rep.status(500).send()
  }
}
