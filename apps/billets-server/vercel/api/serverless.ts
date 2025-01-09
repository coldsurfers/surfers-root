import { connectDbClient, disconnectDbClient } from '@/lib/db'
import { app } from '@/server'
import { VercelApiHandler, VercelRequest, VercelResponse } from '@vercel/node'
import allowVercelCors from '../../src/lib/allowVercelCors'

const handler: VercelApiHandler = async (req: VercelRequest, res: VercelResponse) => {
  await connectDbClient()
  await app.ready()
  app.server.emit('request', req, res)
  await disconnectDbClient()
}

export default allowVercelCors(handler)
