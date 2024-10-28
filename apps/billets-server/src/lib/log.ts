import { fastifyInstance } from './fatsifyInstance'

export default function log(msg?: string, ...args: never[]): void {
  fastifyInstance.log.info(msg, ...args)
  if (process.env.NODE_ENV === 'development') {
    console.log(msg, ...args)
  }
}
