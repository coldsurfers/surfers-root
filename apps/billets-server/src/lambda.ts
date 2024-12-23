import AwsLambdaFastify from '@fastify/aws-lambda'
import { fastify } from './server'

const _handler = AwsLambdaFastify(fastify)

export const handler = _handler
