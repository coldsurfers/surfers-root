/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv'

dotenv.config()

export default $config({
  app(input) {
    return {
      name: 'billets-web',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          region: 'ap-northeast-2',
        },
      },
    }
  },
  async run() {
    new sst.aws.Nextjs('BilletsWeb', {
      domain: {
        name: process.env.BILLETS_WEB_DOMAIN_NAME!,
        cert: process.env.BILLETS_WEB_DOMAIN_CERT_ARN!,
      },
    })
  },
})
