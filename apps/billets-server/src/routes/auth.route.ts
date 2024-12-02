import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { errorResponseSchema } from '../lib/error'
import {
  confirmAuthCodeHandler,
  sendAuthCodeHandler,
  signinHandler,
  signinPreHandler,
  signupHandler,
  signupPreHandler,
} from './auth.handler'
import {
  confirmAuthCodeBodySchema,
  confirmAuthCodeResponseSchema,
  sendAuthCodeBodySchema,
  sendAuthCodeResponseSchema,
  signInBodySchema,
  signInResponseSchema,
  signUpBodySchema,
  signUpResponseSchema,
} from './auth.types'

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/email/send-auth-code',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: sendAuthCodeBodySchema,
        response: {
          200: sendAuthCodeResponseSchema,
        },
      },
    },
    sendAuthCodeHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/email/confirm-auth-code',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: confirmAuthCodeBodySchema,
        response: {
          200: confirmAuthCodeResponseSchema,
        },
      },
    },
    confirmAuthCodeHandler,
  )

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/signin',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: signInBodySchema,
        response: {
          200: signInResponseSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
      preHandler: signinPreHandler,
    },
    signinHandler,
  )

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/signup',
    {
      schema: {
        tags: ['v1', 'auth'],
        body: signUpBodySchema,
        response: {
          201: signUpResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
      preHandler: signupPreHandler,
    },
    signupHandler,
  )

  done()
}

export default authRoute
