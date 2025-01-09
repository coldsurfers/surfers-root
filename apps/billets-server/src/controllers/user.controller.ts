import { EmailAuthRequestDTO } from '@/dtos/email-auth-request-dto'
import { UserDTO, userDTOSerializedSchema } from '@/dtos/user-dto'
import { errorResponseSchema } from '@/lib/error'
import { activateUserBodySchema, deactivateUserBodySchema, GetMeResponse } from '@/routes/user/user.types'
import { differenceInMinutes } from 'date-fns/differenceInMinutes'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import { RouteGenericInterface } from 'fastify/types/route'
import { z } from 'zod'

interface GetMeRoute extends RouteGenericInterface {
  Reply: {
    200: GetMeResponse
    401: z.infer<typeof errorResponseSchema>
    404: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const getMeHandler = async (req: FastifyRequest<GetMeRoute>, rep: FastifyReply<GetMeRoute>) => {
  try {
    const userDTO = await UserDTO.findById(req.user.id)
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

interface DeactivateUserRoute extends RouteGenericInterface {
  Body: z.infer<typeof deactivateUserBodySchema>
  Reply: {
    200: z.infer<typeof userDTOSerializedSchema>
    401: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const deactivateUserHandler = async (
  req: FastifyRequest<DeactivateUserRoute>,
  rep: FastifyReply<DeactivateUserRoute>,
) => {
  try {
    const user = await UserDTO.findById(req.user.id)
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

interface ActivateUserRoute extends RouteGenericInterface {
  Body: z.infer<typeof activateUserBodySchema>
  Reply: {
    200: z.infer<typeof userDTOSerializedSchema>
    401: z.infer<typeof errorResponseSchema>
    404: z.infer<typeof errorResponseSchema>
    409: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const activateUserHandler = async (
  req: FastifyRequest<ActivateUserRoute>,
  rep: FastifyReply<ActivateUserRoute>,
) => {
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
