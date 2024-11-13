import createClient, { Middleware } from 'openapi-fetch'
import { paths } from '../../types/api'
import { API_BASE_URL } from '../constants'
import getAccessToken from '../getAccessToken'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const client = createClient<paths>({
  baseUrl: API_BASE_URL,
  headers: DEFAULT_HEADERS,
})

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = await getAccessToken()
    if (accessToken) {
      request.headers.set('Authorization', `${accessToken}`)
    }
    return request
  },
}

client.use(authMiddleware)

export default client
