import { RouteHandler } from 'fastify'
import { FCMTokenDTO } from 'src/dtos'
import { findUserByAccessToken } from './user.service'
import { GetMeResponse, PostFCMTokenBody, PostFCMTokenResponse } from './user.types'

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

export const postFCMTokenHandler: RouteHandler<{
  Body: PostFCMTokenBody
  Reply: {
    201: PostFCMTokenResponse
    401: void
    500: void
  }
}> = async (req, rep) => {
  try {
    const { fcmToken } = req.body
    const userDTO = await findUserByAccessToken(req.headers.authorization ?? '')
    if (!userDTO) {
      return rep.status(401).send()
    }
    const dto = new FCMTokenDTO({
      userId: userDTO.id,
      tokenValue: fcmToken,
    })
    const created = await dto.create()
    const serialized = created.serialize()
    return rep.status(201).send({
      fcmToken: serialized.token,
      userId: serialized.userId,
    })
  } catch (e) {
    return rep.status(500).send()
  }
}
