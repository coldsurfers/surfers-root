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
    const secrets = {
      appPlatform: new sst.Secret('APP_PLATFORM'),
      domainName: new sst.Secret('BILLETS_WEB_DOMAIN_NAME'),
      domainCertArn: new sst.Secret('BILLETS_WEB_DOMAIN_CERT_ARN'),
    }
    const name = (() => {
      switch (secrets.appPlatform.value.get()) {
        case 'production':
          return 'BilletsWeb'
        case 'staging':
        default:
          return 'BilletsWebStaging'
      }
    })()
    new sst.aws.Nextjs(name, {
      domain: {
        name: secrets.domainName.value.get()!,
        cert: secrets.domainCertArn.value.get()!,
      },
    })
  },
})
