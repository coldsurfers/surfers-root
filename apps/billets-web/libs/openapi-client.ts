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
  concert: {
    queryKeys: {
      all: ['concert'],
      list: {
        all: ['concert', 'list'],
        paginated: {
          byLocation: ({ latitude, longitude }: { latitude?: number; longitude?: number }) => [
            'concert',
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
        }) => ['concert', 'list', { latitude, longitude, offset, size }],
      },
      detail: (id: string) => ['concert', 'detail', id],
    },
    getConcerts: async ({
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
      const response = await baseFetchClient.GET('/v1/concert/', {
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
  poster: {
    queryKeys: {
      all: ['poster'],
      list: {
        all: ['poster', 'list'],
        byConcertId: (concertId: string) => ['poster', 'list', { concertId }],
      },
    },
    getPostersByConcertId: async (concertId: string) => {
      const response = await baseFetchClient.GET('/v1/poster/concert/{concertId}', {
        params: {
          path: {
            concertId,
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
      list: {
        all: ['venue', 'list'],
        byConcertId: (concertId: string) => ['venue', 'list', { concertId }],
      },
      detail: (id: string) => ['venue', 'detail', id],
    },
    getVenuesByConcertId: async (concertId: string) => {
      const response = await baseFetchClient.GET('/v1/venue/concert/{concertId}', {
        params: {
          path: {
            concertId,
          },
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
  artist: {
    queryKeys: {
      all: ['artist'],
      list: {
        all: ['artist', 'list'],
        byConcertId: (concertId: string) => ['artist', 'list', { concertId }],
      },
    },
    getArtistsByConcertId: async (concertId: string) => {
      const response = await baseFetchClient.GET('/v1/artist/concert/{concertId}', {
        params: {
          path: {
            concertId,
          },
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
  ticket: {
    queryKeys: {
      all: ['ticket'],
      list: {
        all: ['ticket', 'list'],
        byConcertId: (concertId: string) => ['ticket', 'list', { concertId }],
      },
    },
    getTicketsByConcertId: async (concertId: string) => {
      const response = await baseFetchClient.GET('/v1/ticket/concert/{concertId}', {
        params: {
          path: {
            concertId,
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
      list: {
        all: ['price', 'list'],
        byTicketId: (ticketId: string) => ['price', 'list', { ticketId }],
      },
    },
    getPricesByTicketId: async (ticketId: string) => {
      const response = await baseFetchClient.GET('/v1/price/ticket/{ticketId}', {
        params: {
          path: {
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
      list: {
        all: ['artist-profile-image', 'list'],
        byArtistId: (artistId: string) => ['artist-profile-image', 'list', { artistId }],
      },
    },
    getArtistProfileImagesByArtistId: async (artistId: string) => {
      const response = await baseFetchClient.GET('/v1/artist-profile-image/artist/{artistId}', {
        params: {
          path: {
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
