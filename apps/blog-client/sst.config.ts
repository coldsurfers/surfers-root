/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'blog-client',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
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
