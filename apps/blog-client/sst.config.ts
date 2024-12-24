/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv'

dotenv.config()

export default $config({
  app(input) {
    return {
      name: 'blog-client',
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
    new sst.aws.Nextjs('BlogClient', {
      domain: {
        name: process.env.BLOG_CLIENT_DOMAIN_NAME!,
        cert: process.env.BLOG_CLIENT_DOMAIN_CERT_ARN!,
      },
    })
  },
})
