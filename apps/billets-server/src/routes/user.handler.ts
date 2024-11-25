import { RouteHandler } from 'fastify'
import { findUserByAccessToken } from './user.service'
import { GetMeResponse } from './user.types'

export const getMeHandler: RouteHandler<{
  Reply: {
    200: GetMeResponse
    404: void
    500: void
  }
}> = async (req, rep) => {
  try {
    const userDTO = await findUserByAccessToken(req.headers.authorization ?? '')
    if (!userDTO) {
      return rep.status(404).send()
    }
    return rep.status(200).send(userDTO.serialize())
  } catch (e) {
    return rep.status(500).send()
  }
}
