import type {
  VercelApiHandler,
  VercelRequest,
  VercelResponse,
} from '@vercel/node'
import { fastify } from '../../src/server'
import allowVercelCors from '../../src/utils/allowVercelCors'
import { connect, disconnect } from '../../src'

const handler: VercelApiHandler = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  await connect()
  await fastify.ready()
  fastify.server.emit('request', req, res)
  await disconnect()
}

export default allowVercelCors(handler)
