import { differenceInMinutes } from 'date-fns/differenceInMinutes'
import { RouteHandler } from 'fastify'
import { z } from 'zod'
import EmailAuthRequestDTO from '../dtos/EmailAuthRequestDTO'
import UserDTO from '../dtos/UserDTO'
import { userDTOSerializedSchema } from '../dtos/UserDTO.types'
import { errorResponseSchema } from '../lib/error'
import { decodeToken } from '../lib/jwt'
import { findUserByAccessToken } from './user.service'
import { activateUserBodySchema, deactivateUserBodySchema, GetMeResponse } from './user.types'

export const getMeHandler: RouteHandler<{
  Reply: {
    200: GetMeResponse
    401: z.infer<typeof errorResponseSchema>
    404: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  try {
    const userDTO = await findUserByAccessToken(req.headers.authorization ?? '')
    if (!userDTO) {
      return rep.status(404).send({
        code: 'USER_NOT_FOUND',
        message: 'user not found',
      })
    }
    if (userDTO.deactivatedAt) {
      return rep.status(401).send({
        code: 'USER_DEACTIVATED',
        message: 'deactivated user',
      })
    }
    return rep.status(200).send(userDTO.serialize())
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

export const deactivateUserHandler: RouteHandler<{
  Body: z.infer<typeof deactivateUserBodySchema>
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

export const activateUserHandler: RouteHandler<{
  Body: z.infer<typeof activateUserBodySchema>
  Reply: {
    200: z.infer<typeof userDTOSerializedSchema>
    401: z.infer<typeof errorResponseSchema>
    404: z.infer<typeof errorResponseSchema>
    409: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  try {
    const { authCode, email } = req.body
    const authCodeDTO = await EmailAuthRequestDTO.findByEmail(email)
    if (!authCodeDTO) {
      return rep.status(404).send({
        code: 'EMAIL_AUTH_REQUEST_NOT_FOUND',
        message: 'email auth request not found',
      })
    }
    if (authCodeDTO.props.email !== email || authCodeDTO.props.authcode !== authCode) {
      return rep.status(401).send({
        code: 'INVALID_EMAIL_AUTH_REQUEST',
        message: 'invalid email auth request',
      })
    }
    if (authCodeDTO.props.authenticated) {
      return rep.status(409).send({
        code: 'EMAIL_AUTH_REQUEST_ALREADY_AUTHENTICATED',
        message: 'already authenticated',
      })
    }
    if (authCodeDTO.props.createdAt) {
      const diffMinutes = Math.abs(differenceInMinutes(new Date(), authCodeDTO.props.createdAt))
      if (diffMinutes >= 3) {
        return rep.status(401).send({
          code: 'EMAIL_AUTH_REQUEST_TIMEOUT',
          message: 'email auth request time out',
        })
      }
    }
    await authCodeDTO.confirm()
    const userToActivate = await UserDTO.findByEmail(email)
    if (!userToActivate) {
      return rep.status(404).send({
        code: 'USER_NOT_FOUND',
        message: 'cannot find user',
      })
    }
    const activated = await userToActivate.activate()
    return rep.status(200).send(activated.serialize())
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
