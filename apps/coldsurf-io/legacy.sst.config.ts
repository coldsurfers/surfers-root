/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv';

dotenv.config();

// legacy 배포가 필요할 시, sst.config.ts로 복붙해서 사용하세요
export default $config({
  app(input) {
    const name = input?.stage === 'production' ? 'billets-web' : 'billets-web-staging';
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
          return 'BilletsWeb';
        default:
          return 'BilletsWebStaging';
      }
    })();
    new sst.aws.Nextjs(name, {
      domain: {
        name: process.env.BILLETS_WEB_DOMAIN_NAME ?? '',
        cert: process.env.BILLETS_WEB_DOMAIN_CERT_ARN ?? '',
      },
    });
  },
});
