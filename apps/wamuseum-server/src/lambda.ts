import AwsLambdaFastify from '@fastify/aws-lambda'
import { connect, disconnect } from './libs/db/db.utils'
import { fastify } from './server'

const _handler = AwsLambdaFastify(fastify)

export const handler = async (event: unknown, context: unknown) => {
  await connect()
  const response = await _handler(event, context)
  await disconnect()
  return response
}
