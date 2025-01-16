import AwsLambdaFastify from '@fastify/aws-lambda'
import { SUPPORTED_MIME_TYPES } from './lib/constants'
import { connectDbClient, disconnectDbClient } from './lib/db'
import { app } from './server'

const _handler = AwsLambdaFastify(app, {
  binaryMimeTypes: SUPPORTED_MIME_TYPES,
})

export const handler = async (event: unknown, context: unknown) => {
  await connectDbClient()
  const response = await _handler(event, context)
  await disconnectDbClient()
  return response
}
