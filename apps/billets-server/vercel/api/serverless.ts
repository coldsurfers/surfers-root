import { app } from '@/server'
import { VercelApiHandler, VercelRequest, VercelResponse } from '@vercel/node'
import allowVercelCors from '../../src/lib/allowVercelCors'
import { connect, disconnect } from '../../src/prisma/connect'

const handler: VercelApiHandler = async (req: VercelRequest, res: VercelResponse) => {
  await connect()
  await app.ready()
  app.server.emit('request', req, res)
  await disconnect()
}

export default allowVercelCors(handler)
