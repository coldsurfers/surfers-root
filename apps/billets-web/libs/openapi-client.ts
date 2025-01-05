import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'
import { paths } from '../types/api'
import { API_BASE_URL } from './constants'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const baseFetchClient = createFetchClient<paths>({
  baseUrl: API_BASE_URL,
  headers: DEFAULT_HEADERS,
})

export const $api = createClient(baseFetchClient)

export const apiClient = {
  concerts: {
    queryKeys: {
      getConcerts: ({ offset, size }: { offset: number; size: number }) => ['concerts', { offset, size }],
    },
    getConcerts: async ({ offset, size }: { offset: number; size: number }) => {
      const response = await baseFetchClient.GET('/v1/concert/', {
        params: {
          query: {
            offset: `${offset}`,
            size: `${size}`,
          },
        },
      })
      return response.data
    },
  },
  location: {
    queryKeys: {
      getCountries: () => ['countries'],
    },
    getCountries: async () => {
      const response = await baseFetchClient.GET('/v1/location/country')
      if (response.error) {
        // @todo: handle error
        throw response.error
      }
      return response.data
    },
  },
}
