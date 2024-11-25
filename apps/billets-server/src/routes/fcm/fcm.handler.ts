import { RouteHandler } from 'fastify'
import { FCMTokenDTO, FCMTokenDTOSerialized } from 'src/dtos'
import { decodeToken } from '../../lib/jwt'
import { PostFCMTokenBody } from './fcm.types'

export const postFCMTokenHandler: RouteHandler<{
  Body: PostFCMTokenBody
  Reply: {
    201: FCMTokenDTOSerialized
    401: void
    500: void
  }
}> = async (req, rep) => {
  try {
    const { authorization } = req.headers
    const { fcmToken } = req.body
    if (authorization) {
      // link fcm token with user
      const decoded = decodeToken(authorization)
      if (!decoded) {
        return rep.status(401).send()
      }
      const { id: userId } = decoded
      let existing = await FCMTokenDTO.findByTokenValue(fcmToken)
      if (!existing) {
        existing = await new FCMTokenDTO({
          tokenValue: fcmToken,
        }).create()
      }
      const dto = await existing.linkToUser(userId)
      return rep.status(201).send(dto.serialize())
    }
    // store fcm token
    const dto = await new FCMTokenDTO({
      tokenValue: fcmToken,
    }).create()
    return rep.status(201).send(dto.serialize())
  } catch (e) {
    return rep.status(500).send()
  }
}
