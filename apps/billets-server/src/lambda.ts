import AwsLambdaFastify from '@fastify/aws-lambda'
import { connectDbClient, disconnectDbClient } from './lib/db'
import { app } from './server'

const _handler = AwsLambdaFastify(app)

export const handler = async (event: unknown, context: unknown) => {
  await connectDbClient()
  const response = await _handler(event, context)
  await disconnectDbClient()
  return response
}
