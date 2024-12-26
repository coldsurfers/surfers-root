/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv'

dotenv.config()

export default $config({
  app(input) {
    return {
      name: 'surf-tree',
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
    new sst.aws.Nextjs('SurfTree', {
      domain: {
        name: process.env.SURF_TREE_DOMAIN_NAME!,
        cert: process.env.SURF_TREE_DOMAIN_CERT_ARN!,
      },
    })
  },
})
