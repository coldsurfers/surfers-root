const IS_DEV = process.env.NODE_ENV === 'development'

const PROD_API_HOST = 'https://api.wa-museum.coldsurf.io'

export const urls = {
  apolloServer: IS_DEV ? 'http://localhost:3002/api/graphql' : `${PROD_API_HOST}/api/graphql`,
  fileUploadPresignedServer: IS_DEV ? 'http://localhost:3002/api/presigned' : `${PROD_API_HOST}/api/presigned`,
}
