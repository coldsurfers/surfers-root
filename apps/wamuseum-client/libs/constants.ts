const IS_DEV = process.env.NODE_ENV === 'development'

const PROD_API_HOST = 'https://api.wm.coldsurf.io'
const DEV_API_HOST = 'https://dev.api.wm.coldsurf.io'

export const urls = {
  apolloServer: IS_DEV ? `${DEV_API_HOST}/api/graphql` : `${PROD_API_HOST}/api/graphql`,
  fileUploadPresignedServer: IS_DEV ? `${DEV_API_HOST}/api/presigned` : `${PROD_API_HOST}/api/presigned`,
}
