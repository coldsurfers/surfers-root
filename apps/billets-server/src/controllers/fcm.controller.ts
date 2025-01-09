import { FCMTokenDTO } from '@/dtos/fcm-token.dto'
import { errorResponseSchema } from '@/lib/error'
import { FCMTokenRepositoryImpl } from '@/repositories/fcm-token.repository.impl'
import { PostFCMTokenBody } from '@/routes/fcm'
import { app } from '@/server'
import { FCMTokenService } from '@/services/fcm-token.service'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'
import { z } from 'zod'

const fcmTokenRepository = new FCMTokenRepositoryImpl()
const fcmTokenService = new FCMTokenService(fcmTokenRepository)

interface PostFCMRoute extends RouteGenericInterface {
  Body: PostFCMTokenBody
  Reply: {
    201: FCMTokenDTO
    401: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const postFCMTokenHandler = async (req: FastifyRequest<PostFCMRoute>, rep: FastifyReply<PostFCMRoute>) => {
  try {
    const { fcmToken } = req.body
    const { authorization: Authorization } = req.headers
    if (Authorization) {
      const decoded = app.jwt.verify(Authorization.replace('Bearer ', ''))
      if (!decoded) {
        return rep.status(401).send({
          code: 'INVALID_ACCESS_TOKEN',
          message: 'unauthorized',
        })
      }
      const { id: userId } = decoded as {
        id: string
      }
      let existing = await fcmTokenService.getByToken(fcmToken)
      if (!existing) {
        existing = await fcmTokenService.create(fcmToken)
      }
      const dto = await fcmTokenService.linkToUser({ userId, fcmTokenId: existing.id })
      return rep.status(201).send(dto)
    }
    // store fcm token
    const dto = await fcmTokenService.create(fcmToken)
    return rep.status(201).send(dto)
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
