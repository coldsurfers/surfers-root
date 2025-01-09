import { FCMTokenDTO, FCMTokenDTOSerialized } from '@/dtos/fcm-token-dto'
import { errorResponseSchema } from '@/lib/error'
import { PostFCMTokenBody } from '@/routes/fcm'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { z } from 'zod'
import { fastify } from '../server'

interface PostFCMRoute extends RouteGenericInterface {
  Body: PostFCMTokenBody
  Reply: {
    201: FCMTokenDTOSerialized
    401: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const postFCMTokenHandler = async (req: FastifyRequest<PostFCMRoute>, rep: FastifyReply<PostFCMRoute>) => {
  try {
    const { fcmToken } = req.body
    const { authorization: Authorization } = req.headers
    if (Authorization) {
      const decoded = fastify.jwt.verify(Authorization.replace('Bearer ', ''))
      if (!decoded) {
        return rep.status(401).send({
          code: 'INVALID_ACCESS_TOKEN',
          message: 'unauthorized',
        })
      }
      const { id: userId } = decoded as {
        id: string
      }
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
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
