export const COOKIES = {
  ACCESS_TOKEN: '@coldsurfers/grungebank.access_token',
  REFRESH_TOKEN: '@coldsurfers/grungebank.refresh_token',
}

export const URLS = {
  LOGIN_REDIRECT_URI:
    process.env.NODE_ENV === 'development'
      ? 'https://accounts.coldsurf.io?redirect_uri=http://localhost:3000/login-handler'
      : 'https://accounts.coldsurf.io?redirect_uri=https://grungebank.coldsurf.io/login-handler',
}

export const API_HOST =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://grungebank.coldsurf.io'

export const API_BASE_URL =
  process.env.NODE_ENV === 'development' ? 'https://api.billets.coldsurf.io' : 'https://api.billets.coldsurf.io'
