import { VercelApiHandler, VercelRequest, VercelResponse } from '@vercel/node'
import { fastify } from '../../src/server'
import { connect, disconnect } from '../../src/prisma/connect'
import allowVercelCors from '../../src/lib/allowVercelCors'

const handler: VercelApiHandler = async (req: VercelRequest, res: VercelResponse) => {
  await connect()
  await fastify.ready()
  fastify.server.emit('request', req, res)
  await disconnect()
}

export default allowVercelCors(handler)
