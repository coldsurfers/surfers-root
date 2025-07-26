const IS_DEV = process.env.NODE_ENV === 'development';

const PROD_API_HOST = 'https://api.wm.coldsurf.io';
const DEV_API_HOST = 'https://dev.api.wm.coldsurf.io';
const LOCAL_API_HOST = 'http://localhost:3002';

const LOCAL_CLIENT_HOST = 'http://localhost:3000';
const PROD_CLIENT_HOST = 'https://wamuseum.coldsurf.io';

export const urls = {
  apolloServer: IS_DEV ? `${LOCAL_API_HOST}/api/graphql` : `${PROD_API_HOST}/api/graphql`,
  fileUploadPresignedServer: IS_DEV
    ? `${DEV_API_HOST}/api/presigned`
    : `${PROD_API_HOST}/api/presigned`,
  clientUrl: IS_DEV ? LOCAL_CLIENT_HOST : PROD_CLIENT_HOST,
};
