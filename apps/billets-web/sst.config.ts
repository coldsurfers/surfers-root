/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'billets-web',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
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
