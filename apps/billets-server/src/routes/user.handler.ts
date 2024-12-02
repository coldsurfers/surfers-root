import { RouteHandler } from 'fastify'
import { z } from 'zod'
import UserDTO from '../dtos/UserDTO'
import { userDTOSerializedSchema } from '../dtos/UserDTO.types'
import { errorResponseSchema } from '../lib/error'
import { decodeToken } from '../lib/jwt'
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

export const deactivateUserHandler: RouteHandler<{
  Reply: {
    200: z.infer<typeof userDTOSerializedSchema>
    401: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return rep.status(401).send({
        code: 'ACCESS_TOKEN_NOT_FOUND',
        message: 'access token not found',
      })
    }
    const decoded = decodeToken(authorization)
    if (!decoded) {
      return rep.status(401).send({
        code: 'INVALID_ACCESS_TOKEN',
        message: 'invalid access token',
      })
    }
    const { id: userId } = decoded
    const user = await UserDTO.findById(userId)
    if (!user) {
      return rep.status(401).send({
        code: 'USER_NOT_FOUND',
        message: 'user not found',
      })
    }
    const userToDeactivate = new UserDTO(user)
    const deactivated = await userToDeactivate.deactivate()
    return rep.status(200).send(deactivated.serialize())
  } catch (e) {
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}
