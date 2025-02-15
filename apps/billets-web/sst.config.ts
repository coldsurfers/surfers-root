/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(process.cwd(), '.env.production'),
})

export default $config({
  app(input) {
    const name = input?.stage === 'production' ? 'billets-web' : 'billets-web-staging'
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
          return 'BilletsWeb'
        case 'staging':
        default:
          return 'BilletsWebStaging'
      }
    })()
    new sst.aws.Nextjs(name, {
      domain: {
        name: process.env.BILLETS_WEB_DOMAIN_NAME!,
        cert: process.env.BILLETS_WEB_DOMAIN_CERT_ARN!,
      },
    })
  },
})
