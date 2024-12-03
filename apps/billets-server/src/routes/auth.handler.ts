import { differenceInMinutes } from 'date-fns/differenceInMinutes'
import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify'
import { OAuth2Client } from 'google-auth-library'
import { match } from 'ts-pattern'
import { z } from 'zod'
import AuthTokenDTO from '../dtos/AuthTokenDTO'
import EmailAuthRequestDTO from '../dtos/EmailAuthRequestDTO'
import UserDTO from '../dtos/UserDTO'
import createEmailAuthCode from '../lib/createEmailAuthCode'
import encryptPassword from '../lib/encryptPassword'
import { ErrorResponse, errorResponseSchema } from '../lib/error'
import { generateAuthToken } from '../lib/jwt'
import log from '../lib/log'
import { sendEmail } from '../lib/mailer'
import verifyAppleToken from '../lib/verifyAppleToken'
import {
  ConfirmAuthCodeBody,
  ConfirmAuthCodeResponse,
  SendAuthCodeBody,
  SendAuthCodeResponse,
  SignInBody,
  SignInResponse,
  signInResponseSchema,
  SignUpBody,
  SignUpResponse,
} from './auth.types'

const googleOAuth2Client = new OAuth2Client()

export const signupPreHandler = async (
  req: FastifyRequest<{
    Body: SignUpBody
  }>,
  rep: FastifyReply,
) => {
  try {
    const { email } = req.body
    const user = await UserDTO.findByEmail(email)
    if (user?.deactivatedAt) {
      return rep.status(401).send({
        code: 'USER_DEACTIVATED',
        message: 'this account was deactivated',
      })
    }
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

export const signinPreHandler = async (
  req: FastifyRequest<{
    Body: SignInBody
  }>,
  rep: FastifyReply<{
    Reply: {
      200: z.infer<typeof signInResponseSchema>
      401: ErrorResponse
      500: ErrorResponse
    }
  }>,
  // eslint-disable-next-line consistent-return
) => {
  try {
    const { provider, email } = req.body
    const existing = await UserDTO.findByEmail(email)
    if (existing?.deactivatedAt) {
      return rep.status(401).send({
        code: 'USER_DEACTIVATED',
        message: 'this account was deactivated',
      })
    }
    if (provider !== 'email') {
      if (!existing) {
        return rep.redirect('/v1/auth/signup', 307)
      }
    }
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'unknown error',
    })
  }
}

export const signinHandler: RouteHandler<{
  Body: SignInBody
  Reply: {
    200: SignInResponse
    400: ErrorResponse
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  const { email, password, provider, token } = req.body

  try {
    return await match(provider)
      .with('email', async () => {
        const existing = await UserDTO.findByEmail(email)
        if (!existing) {
          return rep.status(404).send({
            code: 'USER_NOT_FOUND',
            message: 'user not found',
          })
        }
        if (!existing.props.id || !password || !existing.props.passwordSalt) {
          return rep.status(400).send({
            code: 'INVALID_USER',
            message: 'invalid user',
          })
        }
        const { encrypted } = encryptPassword({
          plain: password,
          originalSalt: existing.props.passwordSalt,
        })
        if (encrypted !== existing.props.password) {
          return rep.status(401).send({
            code: 'PASSWORD_NOT_MATCH',
            message: 'password not match',
          })
        }
        const { accessToken, refreshToken } = generateAuthToken({
          userId: existing.props.id,
        })
        const authTokenDTO = new AuthTokenDTO({
          access_token: accessToken,
          refresh_token: refreshToken,
          user_id: existing.props.id,
        })
        const createdAuthToken = await authTokenDTO.create()
        return rep.status(200).send({
          user: existing.serialize(),
          authToken: createdAuthToken.serialize(),
        })
      })
      .otherwise(async (value) => {
        if (!token) {
          return rep.status(400).send({
            code: 'ACCESS_TOKEN_NOT_FOUND',
            message: 'access token not found',
          })
        }
        const existing = await UserDTO.findByEmail(email)
        if (!existing || !existing.props.id) {
          return rep.status(404).send({
            code: 'USER_NOT_FOUND',
            message: 'user not found',
          })
        }
        if (value === 'google') {
          await googleOAuth2Client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
          })
        }
        if (value === 'apple') {
          await verifyAppleToken(token, process.env.BILLETS_APP_APPLE_BUNDLE_ID ?? '')
        }

        const { accessToken, refreshToken } = generateAuthToken({
          userId: existing.props.id,
        })
        const authTokenDTO = new AuthTokenDTO({
          access_token: accessToken,
          refresh_token: refreshToken,
          user_id: existing.props.id,
        })
        const createdAuthToken = await authTokenDTO.create()
        return rep.status(200).send({
          user: existing.serialize(),
          authToken: createdAuthToken.serialize(),
        })
      })
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'unknown error',
    })
  }
}

export const signupHandler: RouteHandler<{
  Body: SignUpBody
  Reply: {
    201: SignUpResponse
    400: ErrorResponse
    401: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const { provider, email, password, token } = req.body
    return await match(provider)
      .with('email', async () => {
        if (!password) {
          return rep.status(400).send()
        }

        if (password.length < 8 || password.length > 30) {
          return rep.status(400).send({
            code: 'INVALID_PASSWORD',
            message: '비밀번호의 길이는 최소 8자 이상, 최대 30자까지만 가능해요',
          })
        }
        // eslint-disable-next-line prefer-regex-literals
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
        if (!regex.test(password)) {
          return rep.status(400).send({
            code: 'INVALID_PASSWORD',
            message: '비밀번호는 최소 1개 이상의 대소문자와 숫자, 특수문자를 포함해야 해요',
          })
        }

        const { encrypted, salt } = encryptPassword({
          plain: password,
          originalSalt: undefined,
        })
        const userDTO = new UserDTO({
          email,
          provider: 'email',
          password: encrypted,
          passwordSalt: salt,
        })
        const created = await userDTO.create()
        if (!created.props.id) {
          return rep.status(400).send()
        }
        const { accessToken, refreshToken } = generateAuthToken({
          userId: created.props.id,
        })
        const authTokenDTO = new AuthTokenDTO({
          access_token: accessToken,
          refresh_token: refreshToken,
          user_id: created.props.id,
        })
        const createdAuthToken = await authTokenDTO.create()
        return rep.status(201).send({
          user: userDTO.serialize(),
          authToken: createdAuthToken.serialize(),
        })
      })
      .otherwise(async (value) => {
        if (!token) {
          return rep.status(400).send()
        }
        if (value === 'google') {
          await googleOAuth2Client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
          })
        }
        if (value === 'apple') {
          await verifyAppleToken(token, process.env.BILLETS_APP_APPLE_BUNDLE_ID ?? '')
        }
        //
        const userDTO = new UserDTO({
          email,
          provider,
        })
        const created = await userDTO.create()
        if (!created.props.id) {
          return rep.status(400).send()
        }
        const { accessToken, refreshToken } = generateAuthToken({
          userId: created.props.id,
        })
        const authTokenDTO = new AuthTokenDTO({
          access_token: accessToken,
          refresh_token: refreshToken,
          user_id: created.props.id,
        })
        const createdAuthToken = await authTokenDTO.create()
        return rep.status(201).send({
          user: created.serialize(),
          authToken: createdAuthToken.serialize(),
        })
      })
  } catch (e) {
    return rep.status(500).send()
  }
}

export const sendAuthCodeHandler: RouteHandler<{
  Body: SendAuthCodeBody
  Reply: {
    200: SendAuthCodeResponse
    409: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  const { email } = req.body

  try {
    const existingUser = await UserDTO.findByEmail(email)
    if (existingUser) {
      // @todo: I think we have to remove this after extends use case
      return rep.status(409).send({
        code: 'USER_ALREADY_EXISTING',
        message: 'already existing user',
      })
    }

    const authcode = createEmailAuthCode()
    const emailAuthRequestDTO = new EmailAuthRequestDTO({
      email,
      authcode,
    })
    const created = await emailAuthRequestDTO.create()
    const send = await sendEmail({
      from: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
      smtpOptions: {
        service: process.env.BILLETS_SERVER_MAILER_SERVICE,
        auth: {
          user: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
          pass: process.env.BILLETS_SERVER_MAILER_EMAIL_APP_PASSWORD,
        },
      },
      to: created.props.email ?? '',
      subject: 'Billets 이메일 인증 번호',
      html: `Billets의 이메일 인증 번호는 ${created.props.authcode ?? ''}입니다. 3분내에 입력 해 주세요.`,
    })
    console.log(send)
    return rep.status(200).send({
      email: created.props.email ?? '',
    })
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log((e as any).toString())
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

export const confirmAuthCodeHandler: RouteHandler<{
  Body: ConfirmAuthCodeBody
  Reply: {
    200: ConfirmAuthCodeResponse
    401: void
    404: void
    409: void
    500: void
  }
}> = async (req, rep) => {
  try {
    const { authCode, email } = req.body
    const dto = await EmailAuthRequestDTO.findByEmail(email)
    if (!dto) {
      return rep.status(404).send()
    }
    if (dto.props.email !== email || dto.props.authcode !== authCode) {
      return rep.status(401).send()
    }
    if (dto.props.authenticated) {
      return rep.status(409).send()
    }
    if (dto.props.createdAt) {
      const diffMinutes = Math.abs(differenceInMinutes(new Date(), dto.props.createdAt))
      if (diffMinutes >= 3) {
        return rep.status(401).send()
      }
    }
    const confirmed = await dto.confirm()
    return rep.status(200).send({
      email: confirmed.props.email ?? '',
    })
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}
