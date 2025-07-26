/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SURF_TREE_DOMAIN_NAME) {
  throw new Error('SURF_TREE_DOMAIN_NAME is not set');
}
if (!process.env.SURF_TREE_DOMAIN_CERT_ARN) {
  throw new Error('SURF_TREE_DOMAIN_CERT_ARN is not set');
}

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
    };
  },
  async run() {
    new sst.aws.Nextjs('SurfTreeWeb', {
      domain: {
        name: process.env.SURF_TREE_DOMAIN_NAME as string,
        cert: process.env.SURF_TREE_DOMAIN_CERT_ARN as string,
      },
    });
  },
});
