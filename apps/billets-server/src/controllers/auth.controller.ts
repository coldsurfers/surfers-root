import encryptPassword from '@/lib/encryptPassword'
import { ErrorResponse, errorResponseSchema } from '@/lib/error'
import {
  ConfirmAuthCodeBody,
  SendAuthCodeBody,
  SignInBody,
  SignInResponse,
  signInResponseSchema,
  SignUpBody,
  SignUpResponse,
} from '@/routes/auth/auth.types'
import { RouteGenericInterface } from 'fastify/types/route'
import { match } from 'ts-pattern'

import createEmailAuthCode from '@/lib/createEmailAuthCode'
import { googleOAuth2Client } from '@/lib/google-oauth2-client'
import { sendEmail } from '@/lib/mailer'
import verifyAppleToken from '@/lib/verifyAppleToken'
import { app } from '@/server'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmailAuthRequestDTO } from '@/dtos/email-auth-request.dto'
import log from '@/lib/log'
import { AuthTokenRepositoryImpl } from '@/repositories/auth-token.repository.impl'
import { EmailAuthRequestRepositoryImpl } from '@/repositories/email-auth-request.repository.impl'
import { UserRepositoryImpl } from '@/repositories/user.repository.impl'
import { AuthTokenService } from '@/services/auth-token.service'
import { EmailAuthRequestService } from '@/services/email-auth-request.service'
import { UserService } from '@/services/user.service'
import { differenceInMinutes } from 'date-fns/differenceInMinutes'
import dotenv from 'dotenv'

dotenv.config()

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)

const authTokenRepository = new AuthTokenRepositoryImpl()
const authTokenService = new AuthTokenService(authTokenRepository)

const emailAuthRequestRepository = new EmailAuthRequestRepositoryImpl()
const emailAuthRequestService = new EmailAuthRequestService(emailAuthRequestRepository)

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
        // const existing = await UserDTO.findByEmail(email)
        const existing = await userService.getUserByEmail(email)
        if (!existing) {
          return rep.status(404).send({
            code: 'USER_NOT_FOUND',
            message: 'user not found',
          })
        }
        const passwordSalt = await userService.getUserPasswordSalt(existing.id)
        if (!password || !passwordSalt) {
          return rep.status(400).send({
            code: 'INVALID_USER',
            message: 'invalid user',
          })
        }
        const { encrypted } = encryptPassword({
          plain: password,
          originalSalt: passwordSalt,
        })
        const userPassword = await userService.getUserPassword(existing.id)
        if (encrypted !== userPassword) {
          return rep.status(401).send({
            code: 'PASSWORD_NOT_MATCH',
            message: 'password not match',
          })
        }

        const authToken = {
          accessToken: app.jwt.sign(
            {
              id: existing.id,
            },
            {
              expiresIn: '7d',
            },
          ),
          refreshToken: app.jwt.sign(
            {
              id: existing.id,
            },
            {
              expiresIn: '30d',
            },
          ),
        }
        const createdAuthToken = await authTokenService.create({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
          user_id: existing.id,
        })
        return rep.status(200).send({
          user: existing,
          authToken: createdAuthToken,
        })
      })
      .otherwise(async (value) => {
        if (!token) {
          return rep.status(400).send({
            code: 'ACCESS_TOKEN_NOT_FOUND',
            message: 'access token not found',
          })
        }
        const existing = await userService.getUserByEmail(email)
        if (!existing) {
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
          accessToken: app.jwt.sign(
            {
              id: existing.id,
            },
            {
              expiresIn: '7d',
            },
          ),
          refreshToken: app.jwt.sign(
            {
              id: existing.id,
            },
            {
              expiresIn: '30d',
            },
          ),
        }
        const createdAuthToken = await authTokenService.create({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
          user_id: existing.id,
        })
        return rep.status(200).send({
          user: existing,
          authToken: createdAuthToken,
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
    const existing = await userService.getUserByEmail(email)
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
        // const userDTO = new UserDTO({
        //   email,
        //   provider: 'email',
        //   password: encrypted,
        //   passwordSalt: salt,
        // })
        // const created = await userDTO.create()
        const createdUser = await userService.createUser({
          email,
          provider: 'email',
          password: encrypted,
          passwordSalt: salt,
        })
        if (!createdUser) {
          return rep.status(400).send()
        }
        const authToken = {
          accessToken: app.jwt.sign(
            {
              id: createdUser.id,
            },
            {
              expiresIn: '7d',
            },
          ),
          refreshToken: app.jwt.sign(
            {
              id: createdUser.id,
            },
            {
              expiresIn: '30d',
            },
          ),
        }
        const createdAuthToken = await authTokenService.create({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
          user_id: createdUser.id,
        })
        return rep.status(201).send({
          user: createdUser,
          authToken: createdAuthToken,
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
        // const userDTO = new UserDTO({
        //   email,
        //   provider,
        // })
        const createdUser = await userService.createUser({
          email,
          provider,
        })
        if (!createdUser.id) {
          return rep.status(400).send()
        }
        const authToken = {
          accessToken: app.jwt.sign(
            {
              id: createdUser.id,
            },
            {
              expiresIn: '7d',
            },
          ),
          refreshToken: app.jwt.sign(
            {
              id: createdUser.id,
            },
            {
              expiresIn: '30d',
            },
          ),
        }
        const createdAuthToken = await authTokenService.create({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
          user_id: createdUser.id,
        })
        return rep.status(201).send({
          user: createdUser,
          authToken: createdAuthToken,
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
    const user = await userService.getUserByEmail(email)
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
    200: Pick<EmailAuthRequestDTO, 'email'>
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
    const created = await emailAuthRequestService.create(email, authcode)
    const send = await sendEmail({
      from: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
      smtpOptions: {
        service: process.env.BILLETS_SERVER_MAILER_SERVICE,
        auth: {
          user: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
          pass: process.env.BILLETS_SERVER_MAILER_EMAIL_APP_PASSWORD,
        },
      },
      to: created.email ?? '',
      subject: 'Billets 이메일 인증 번호',
      html: `Billets의 이메일 인증 번호는 ${created.authcode ?? ''}입니다. 3분내에 입력 해 주세요.`,
    })
    console.log(send)
    return rep.status(200).send({
      email: created.email,
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
    200: Pick<EmailAuthRequestDTO, 'email'>
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
    const dto = await emailAuthRequestService.findByEmail(email)
    if (!dto) {
      return rep.status(404).send({
        code: 'EMAIL_AUTH_REQUEST_NOT_FOUND',
        message: 'email auth request not found',
      })
    }
    if (dto.email !== email || dto.authcode !== authCode) {
      return rep.status(401).send({
        code: 'INVALID_EMAIL_AUTH_REQUEST',
        message: 'invalid email auth request',
      })
    }
    if (dto.authenticated) {
      return rep.status(409).send({
        code: 'EMAIL_AUTH_REQUEST_ALREADY_AUTHENTICATED',
        message: 'already authenticated',
      })
    }
    if (dto.createdAt) {
      const diffMinutes = Math.abs(differenceInMinutes(new Date(), dto.createdAt))
      if (diffMinutes >= 3) {
        return rep.status(401).send({
          code: 'EMAIL_AUTH_REQUEST_TIMEOUT',
          message: 'email auth request time out',
        })
      }
    }
    const confirmed = await emailAuthRequestService.confirm(dto.id)
    return rep.status(200).send({
      email: confirmed.email ?? '',
    })
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
