import { fastify } from './server'

fastify.listen(
  {
    port: process.env.PORT ? +process.env.PORT : 3001,
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
