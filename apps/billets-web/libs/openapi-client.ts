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

export const apiClient = {
  event: {
    queryKeys: {
      all: ['event'],
      list: {
        all: ['event', 'list'],
        paginated: {
          byLocation: ({ latitude, longitude }: { latitude?: number; longitude?: number }) => [
            'event',
            'list',
            'paginated',
            { latitude, longitude },
          ],
        },
        byLocation: ({
          latitude,
          longitude,
          offset,
          size,
        }: {
          latitude?: number
          longitude?: number
          offset: number
          size: number
        }) => ['event', 'list', { latitude, longitude, offset, size }],
      },
      detail: (id: string) => ['event', 'detail', id],
    },
    getEvents: async ({
      offset,
      size,
      latitude,
      longitude,
    }: {
      offset: number
      size: number
      latitude?: number
      longitude?: number
    }) => {
      const response = await baseFetchClient.GET('/v1/event/', {
        params: {
          query: {
            offset,
            size,
            latitude,
            longitude,
          },
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
    getEventDetail: async (id: string) => {
      const response = await baseFetchClient.GET('/v1/event/{eventId}', {
        params: {
          path: {
            eventId: id,
          },
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
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
  poster: {
    queryKeys: {
      all: ['poster'],
      list: ({ eventId }: { eventId: string }) => ['poster', 'list', { eventId }],
    },
    getPostersByEventId: async (eventId: string) => {
      const response = await baseFetchClient.GET('/v1/poster/', {
        params: {
          query: {
            eventId,
          },
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
  venue: {
    queryKeys: {
      all: ['venue'],
      detail: (id: string) => ['venue', 'detail', id],
    },
    getVenueDetail: async (id: string) => {
      const data = await baseFetchClient.GET('/v1/venue/{id}', {
        params: {
          path: {
            id,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  artist: {
    queryKeys: {
      all: ['artist'],
      detail: (id: string) => ['artist', 'detail', id],
    },
    getArtistDetail: async (id: string) => {
      const data = await baseFetchClient.GET('/v1/artist/{id}', {
        params: {
          path: {
            id,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  ticket: {
    queryKeys: {
      all: ['ticket'],
      list: ({ eventId }: { eventId: string }) => ['ticket', 'list', { eventId }],
    },
    getTicketsByEventId: async (eventId: string) => {
      const response = await baseFetchClient.GET('/v1/ticket/', {
        params: {
          query: {
            eventId,
          },
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
  price: {
    queryKeys: {
      all: ['price'],
      list: ({ ticketId }: { ticketId: string }) => ['price', 'list', { ticketId }],
    },
    getPricesByTicketId: async (ticketId: string) => {
      const response = await baseFetchClient.GET('/v1/price/', {
        params: {
          query: {
            ticketId,
          },
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
  artistProfileImage: {
    queryKeys: {
      all: ['artist-profile-image'],
      list: ({ artistId }: { artistId: string }) => ['artist-profile-image', 'list', { artistId }],
    },
    getArtistProfileImagesByArtistId: async (artistId: string) => {
      const response = await baseFetchClient.GET('/v1/artist-profile-image/', {
        params: {
          query: {
            artistId,
          },
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
}
