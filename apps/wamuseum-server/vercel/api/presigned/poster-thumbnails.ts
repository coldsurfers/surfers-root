import type {
  VercelApiHandler,
  VercelRequest,
  VercelResponse,
} from '@vercel/node'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import FileUploadController from '../../../routes/file-upload/file-upload.controller'
import allowVercelCors from '../../../src/utils/allowVercelCors'
import { connect, disconnect } from '../../../src'

const fastify = Fastify({
  logger: process.env.NODE_ENV === 'development',
})

fastify.register(
  async (instance, opts, done) => {
    await fastify.register(cors)

    await instance.route({
      url: '/poster-thumbnails',
      method: ['OPTIONS', 'GET'],
      handler: FileUploadController.getPosterThumbnailsPresigned,
    })
    done()
  },
  {
    prefix: '/api/presigned',
  }
)

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
