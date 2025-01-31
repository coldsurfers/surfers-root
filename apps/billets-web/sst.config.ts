/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv'

dotenv.config()

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
    const domain = (() => {
      switch (process.env.DEPLOYMENT_STAGE) {
        case 'production':
          return {
            name: process.env.BILLETS_WEB_DOMAIN_NAME!,
            cert: process.env.BILLETS_WEB_DOMAIN_CERT_ARN!,
          }
        case 'staging':
        default:
          return {
            name: process.env.BILLETS_WEB_STAGING_DOMAIN_NAME!,
            cert: process.env.BILLETS_WEB_STAGING_DOMAIN_CERT_ARN!,
          }
      }
    })()
    new sst.aws.Nextjs('BilletsWeb', {
      domain,
    })
  },
})
