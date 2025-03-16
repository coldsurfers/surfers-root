export const API_BASE_URL = (() => {
  switch (process.env.APP_PLATFORM) {
    case 'production':
    case 'staging':
      return 'https://api.billets.coldsurf.io'
    case 'development':
    default:
      return 'https://dev.api.billets.coldsurf.io'
  }
})()

export const SITE_URL = (() => {
  switch (process.env.APP_PLATFORM) {
    case 'production':
      return 'https://billets.coldsurf.io'
    case 'staging':
      return 'https://staging.billets.coldsurf.io'
    case 'development':
    default:
      return 'http://localhost:3000'
  }
})()
export const SITE_MAP_URL = 'https://billets.coldsurf.io/sitemap.xml'
export const SITE_NAME = 'Billets'
export const COMMON_META_TITLE = `Discover live events and tickets | Browse tickets on ${SITE_NAME}`
export const COMMON_META_DESCRIPTION = `${SITE_NAME} is on a mission to support local artists grow up. Download ${SITE_NAME} to support your local artists.`

export const APP_STORE_ID = '1632802589'
export const APP_STORE_URL = `https://itunes.apple.com/app/id${APP_STORE_ID}`

export const GLOBAL_TIME_ZONE = 'Asia/Seoul'

export const GLOBAL_Z_INDEX = {
  APP_HEADER: 99,
  MOBILE_MENU_MODAL: 1000,
}
