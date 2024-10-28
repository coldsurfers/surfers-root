import { fastify } from './server'

fastify.listen(
  {
    port: 3002,
    host: '0.0.0.0',
  },
  (err, address) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('server is running on', address)
  },
)
