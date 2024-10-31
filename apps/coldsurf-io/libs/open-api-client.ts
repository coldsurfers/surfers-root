import createClient from 'openapi-fetch'
import { paths } from '../types/api'
import { API_BASE_URL } from './constants'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const client = createClient<paths>({
  baseUrl: API_BASE_URL,
  headers: DEFAULT_HEADERS,
})

export default client
