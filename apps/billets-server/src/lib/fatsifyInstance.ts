import Fastify from 'fastify'

export const fastifyInstance = Fastify({
  logger: process.env.NODE_ENV === 'development',
})
