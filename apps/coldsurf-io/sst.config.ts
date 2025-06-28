/// <reference path="./.sst/platform/config.d.ts" />

import dotenv from 'dotenv';

dotenv.config();

export default $config({
  app(_) {
    return {
      name: 'coldsurf-io',
      // removal: input?.stage === 'production' ? 'retain' : 'remove',
      // protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  async run() {
    new sst.aws.Nextjs('ColdsurfIOWeb', {
      domain: {
        name: process.env.COLDSURF_IO_DOMAIN_NAME ?? '',
        cert: process.env.COLDSURF_IO_DOMAIN_CERT_ARN ?? '',
      },
    });
  },
});
