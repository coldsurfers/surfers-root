import { startApp } from './server'

async function main() {
  const app = await startApp()

  app.listen(
    {
      port: process.env.PORT ? +process.env.PORT : 3002,
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
}

main()
