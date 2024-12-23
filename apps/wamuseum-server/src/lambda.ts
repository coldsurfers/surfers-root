import AwsLambdaFastify from '@fastify/aws-lambda'
import { connect, disconnect } from './libs/db/db.utils'
import { startApp } from './server'

export const handler = async (event: unknown, context: unknown) => {
  await connect()
  const app = await startApp()
  const _handler = AwsLambdaFastify(app)
  const response = await _handler(event, context)
  await disconnect()
  return response
}
