import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'
import { paths } from '../types/api'
import { API_BASE_URL } from './constants'
import { OpenApiError } from './errors'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const baseFetchClient = createFetchClient<paths>({
  baseUrl: API_BASE_URL,
  headers: DEFAULT_HEADERS,
})

export const $api = createClient(baseFetchClient)

type GetConcertsParams = {
  offset: number
  size: number
  latitude?: number
  longitude?: number
}

export const apiClient = {
  concerts: {
    queryKeys: {
      getConcerts: ({ offset, size, latitude, longitude }: GetConcertsParams) => [
        'concerts',
        { offset, size, latitude, longitude },
      ],
      getConcertById: (id: string) => ['concerts', id],
    },
    getConcerts: async ({ offset, size, latitude, longitude }: GetConcertsParams) => {
      const query: {
        offset: string
        size: string
        latitude?: string
        longitude?: string
      } = {
        offset: `${offset}`,
        size: `${size}`,
      }
      if (latitude && longitude) {
        query.latitude = `${latitude}`
        query.longitude = `${longitude}`
      }
      const response = await baseFetchClient.GET('/v1/concert/', {
        params: {
          query,
        },
      })
      return response.data
    },
    getConcertById: async (id: string) => {
      const response = await baseFetchClient.GET('/v1/concert/{id}', {
        params: {
          path: {
            id,
          },
        },
      })
      if (!response.data || response.error) {
        throw new OpenApiError({
          code: 'CONCERT_NOT_FOUND',
          message: 'concert not found',
        })
      }
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
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
  mailer: {
    queryKeys: {
      sendUserVoice: () => ['sendUserVoice'],
    },
    sendUserVoice: async (body: { email: string; name: string; message: string; updateAgreement: boolean }) => {
      const response = await baseFetchClient.POST('/v1/mailer/user-voice', {
        body,
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
}
