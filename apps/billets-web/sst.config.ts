/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv'

dotenv.config()

export default $config({
  app(input) {
    const name = input?.stage === 'production' ? 'coldsurf-io' : 'coldsurf-io-staging'
    const removal = input?.stage === 'production' || input?.stage === 'staging' ? 'retain' : 'remove'
    const protect = ['production', 'staging'].includes(input?.stage)
    return {
      name,
      removal,
      protect,
      home: 'aws',
      providers: {
        aws: {
          region: 'ap-northeast-2',
        },
      },
    }
  },
  async run() {
    const name = (() => {
      switch (process.env.APP_PLATFORM) {
        case 'production':
          return 'ColdsurfIOWeb'
        // @ts-ignore
        case 'staging':
        default:
          return 'ColdsurfIOWebStaging'
      }
    })()
    new sst.aws.Nextjs(name, {
      domain: {
        name: process.env.COLDSURF_IO_DOMAIN_NAME!,
        cert: process.env.COLDSURF_IO_DOMAIN_CERT_ARN!,
      },
    })
  },
})
