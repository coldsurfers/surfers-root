/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.production',
});

export default $config({
  app(input) {
    const name =
      input?.stage === 'production' ? 'coldsurf-io-client' : 'coldsurf-io-client-staging';
    const removal =
      input?.stage === 'production' || input?.stage === 'staging' ? 'retain' : 'remove';
    const protect = ['production', 'staging'].includes(input?.stage);
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
    };
  },
  async run() {
    const name = (() => {
      switch (process.env.APP_PLATFORM) {
        case 'production':
          return 'ColdsurfIOClient';
        default:
          return 'ColdsurfIOClientStaging';
      }
    })();

    const domain = (() => {
      switch (process.env.APP_PLATFORM) {
        case 'production':
          return {
            name: process.env.COLDSURF_IO_DOMAIN_NAME ?? '',
            cert: process.env.COLDSURF_IO_DOMAIN_CERT_ARN ?? '',
          };
        default:
          return {
            name: process.env.STAGING_COLDSURF_IO_DOMAIN_NAME ?? '',
            cert: process.env.STAGING_COLDSURF_IO_DOMAIN_CERT_ARN ?? '',
          };
      }
    })();
    new sst.aws.Nextjs(name, {
      domain,
    });
  },
});
