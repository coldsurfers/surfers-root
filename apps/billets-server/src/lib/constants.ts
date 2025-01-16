export const SWAGGER_HOST =
  process.env.NODE_ENV === 'development' ? 'localhost:3001' : 'https://api.billets.coldsurf.io'

export const SUPPORTED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
