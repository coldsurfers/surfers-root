import { AuthTokenDTO } from '@/dtos/auth-token-dto'
import { UserDTO } from '@/dtos/user-dto'
import encryptPassword from '@/lib/encryptPassword'
import { ErrorResponse, errorResponseSchema } from '@/lib/error'
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
} from '@/routes/auth/auth.types'
import { RouteGenericInterface } from 'fastify/types/route'
import { match } from 'ts-pattern'

import { EmailAuthRequestDTO } from '@/dtos/email-auth-request-dto'
import createEmailAuthCode from '@/lib/createEmailAuthCode'
import { googleOAuth2Client } from '@/lib/google-oauth2-client'
import { sendEmail } from '@/lib/mailer'
import verifyAppleToken from '@/lib/verifyAppleToken'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { fastify } from '../server'

import log from '@/lib/log'
import { differenceInMinutes } from 'date-fns/differenceInMinutes'
import dotenv from 'dotenv'

dotenv.config()

interface PostSignInRoute extends RouteGenericInterface {
  Body: SignInBody
  Reply: {
    200: SignInResponse
    400: ErrorResponse
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}

export const signinHandler = async (req: FastifyRequest<PostSignInRoute>, rep: FastifyReply<PostSignInRoute>) => {
  const { email, password, provider, token, platform = 'ios' } = req.body

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

        const authToken = {
          accessToken: fastify.jwt.sign(
            {
              id: existing.props.id,
            },
            {
              expiresIn: '7d',
            },
          ),
          refreshToken: fastify.jwt.sign(
            {
              id: existing.props.id,
            },
            {
              expiresIn: '30d',
            },
          ),
        }
        const authTokenDTO = new AuthTokenDTO({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
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
          const audience = match(platform)
            .with('ios', () => process.env.GOOGLE_OAUTH_WEB_IOS_CLIENT_ID)
            .with('android', () => process.env.GOOGLE_OAUTH_WEB_CLIENT_ID)
            .exhaustive()
          await googleOAuth2Client.verifyIdToken({
            idToken: token,
            audience,
          })
        }
        if (value === 'apple') {
          await verifyAppleToken(token, process.env.BILLETS_APP_APPLE_BUNDLE_ID ?? '')
        }

        const authToken = {
          accessToken: fastify.jwt.sign(
            {
              id: existing.props.id,
            },
            {
              expiresIn: '7d',
            },
          ),
          refreshToken: fastify.jwt.sign(
            {
              id: existing.props.id,
            },
            {
              expiresIn: '30d',
            },
          ),
        }
        const authTokenDTO = new AuthTokenDTO({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
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

interface SignInPreHandlerRoute extends RouteGenericInterface {
  Body: SignInBody
  Reply: {
    200: z.infer<typeof signInResponseSchema>
    401: ErrorResponse
    500: ErrorResponse
  }
}

export const signinPreHandler = async (
  req: FastifyRequest<SignInPreHandlerRoute>,
  rep: FastifyReply<SignInPreHandlerRoute>,
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

interface PostSignUpRoute extends RouteGenericInterface {
  Body: SignUpBody
  Reply: {
    201: SignUpResponse
    400: ErrorResponse
    401: ErrorResponse
    500: ErrorResponse
  }
}

export const signupHandler = async (req: FastifyRequest<PostSignUpRoute>, rep: FastifyReply<PostSignUpRoute>) => {
  try {
    const { provider, email, password, token, platform = 'ios' } = req.body
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
        const authToken = {
          accessToken: fastify.jwt.sign(
            {
              id: created.props.id,
            },
            {
              expiresIn: '7d',
            },
          ),
          refreshToken: fastify.jwt.sign(
            {
              id: created.props.id,
            },
            {
              expiresIn: '30d',
            },
          ),
        }
        const authTokenDTO = new AuthTokenDTO({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
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
          const audience = match(platform)
            .with('ios', () => process.env.GOOGLE_OAUTH_WEB_IOS_CLIENT_ID)
            .with('android', () => process.env.GOOGLE_OAUTH_CLIENT_ID)
            .exhaustive()
          await googleOAuth2Client.verifyIdToken({
            idToken: token,
            audience,
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
        const authToken = {
          accessToken: fastify.jwt.sign(
            {
              id: created.props.id,
            },
            {
              expiresIn: '7d',
            },
          ),
          refreshToken: fastify.jwt.sign(
            {
              id: created.props.id,
            },
            {
              expiresIn: '30d',
            },
          ),
        }
        const authTokenDTO = new AuthTokenDTO({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
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

interface SignUpPreHandlerRoute extends RouteGenericInterface {
  Body: SignUpBody
  Reply: {
    401: ErrorResponse
    500: ErrorResponse
  }
}

export const signupPreHandler = async (
  req: FastifyRequest<SignUpPreHandlerRoute>,
  rep: FastifyReply<SignUpPreHandlerRoute>,
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

interface SendAuthCodeRoute extends RouteGenericInterface {
  Body: SendAuthCodeBody
  Reply: {
    200: SendAuthCodeResponse
    409: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const sendAuthCodeHandler = async (
  req: FastifyRequest<SendAuthCodeRoute>,
  rep: FastifyReply<SendAuthCodeRoute>,
) => {
  const { email } = req.body

  try {
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

interface ConfirmAuthCodeRoute extends RouteGenericInterface {
  Body: ConfirmAuthCodeBody
  Reply: {
    200: ConfirmAuthCodeResponse
    401: z.infer<typeof errorResponseSchema>
    404: z.infer<typeof errorResponseSchema>
    409: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const confirmAuthCodeHandler = async (
  req: FastifyRequest<ConfirmAuthCodeRoute>,
  rep: FastifyReply<ConfirmAuthCodeRoute>,
) => {
  try {
    const { authCode, email } = req.body
    const dto = await EmailAuthRequestDTO.findByEmail(email)
    if (!dto) {
      return rep.status(404).send({
        code: 'EMAIL_AUTH_REQUEST_NOT_FOUND',
        message: 'email auth request not found',
      })
    }
    if (dto.props.email !== email || dto.props.authcode !== authCode) {
      return rep.status(401).send({
        code: 'INVALID_EMAIL_AUTH_REQUEST',
        message: 'invalid email auth request',
      })
    }
    if (dto.props.authenticated) {
      return rep.status(409).send({
        code: 'EMAIL_AUTH_REQUEST_ALREADY_AUTHENTICATED',
        message: 'already authenticated',
      })
    }
    if (dto.props.createdAt) {
      const diffMinutes = Math.abs(differenceInMinutes(new Date(), dto.props.createdAt))
      if (diffMinutes >= 3) {
        return rep.status(401).send({
          code: 'EMAIL_AUTH_REQUEST_TIMEOUT',
          message: 'email auth request time out',
        })
      }
    }
    const confirmed = await dto.confirm()
    return rep.status(200).send({
      email: confirmed.props.email ?? '',
    })
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
