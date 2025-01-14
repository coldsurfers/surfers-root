import createFetchClient, { Middleware } from 'openapi-fetch'
import createClient from 'openapi-react-query'
import { paths } from '../../types/api'
import { API_BASE_URL } from '../constants'
import { OpenApiError } from '../errors/openapi-error'
import getAccessToken from '../getAccessToken'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

export const fetchClient = createFetchClient<paths>({
  baseUrl: API_BASE_URL,
  headers: DEFAULT_HEADERS,
})

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = await getAccessToken()
    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return request
  },
}

fetchClient.use(authMiddleware)

export const $api = createClient(fetchClient)

export const apiClient = {
  auth: {
    signIn: async (body: {
      email: string
      password?: string
      platform?: 'android' | 'ios'
      provider: 'google' | 'apple' | 'email'
      token?: string
    }) => {
      const data = await fetchClient.POST('/v1/auth/signin', {
        body,
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  user: {
    queryKeys: {
      all: ['v1', 'user'],
      me: ['v1', 'user', 'me'],
    },
    getMe: async () => {
      const data = await fetchClient.GET('/v1/user/me')
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  artist: {
    queryKeys: {
      all: ['v1', 'artist'],
      list: {
        all: ['v1', 'artist', 'list'],
        byConcertId: (concertId: string) => ['v1', 'artist', 'list', { concertId }],
      },
      detail: (id: string) => ['v1', 'artist', 'detail', id],
    },
    getArtistDetail: async (id: string) => {
      const data = await fetchClient.GET('/v1/artist/{id}', {
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
  artistProfileImage: {
    queryKeys: {
      all: ['v1', 'artist-profile-image'],
      list: ({ artistId }: { artistId: string }) => ['v1', 'artist-profile-image', 'list', { artistId }],
      detail: ({ artistProfileImageId }: { artistProfileImageId: string }) => [
        'v1',
        'artist-profile-image',
        'detail',
        { artistProfileImageId },
      ],
    },
    getList: async ({ artistId }: { artistId: string }) => {
      const data = await fetchClient.GET('/v1/artist-profile-image/', {
        params: {
          query: {
            artistId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getDetail: async ({ artistProfileImageId }: { artistProfileImageId: string }) => {
      const data = await fetchClient.GET('/v1/artist-profile-image/{artistProfileImageId}', {
        params: {
          path: {
            artistProfileImageId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  venue: {
    queryKeys: {
      all: ['v1', 'venue'],
      list: {
        all: ['v1', 'venue', 'list'],
      },
      detail: (venueId: string) => ['v1', 'venue', 'detail', venueId],
    },
    getVenueDetail: async (id: string) => {
      const data = await fetchClient.GET('/v1/venue/{id}', {
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
  poster: {
    queryKeys: {
      all: ['v1', 'poster'],
      list: ({ eventId }: { eventId: string }) => ['v1', 'poster', 'list', { eventId }],
    },
    getList: async ({ eventId }: { eventId: string }) => {
      const data = await fetchClient.GET('/v1/poster/', {
        params: {
          query: {
            eventId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  subscribe: {
    queryKeys: {
      all: ['v1', 'subscribe'],
      eventList: ({ offset, size }: { offset?: number; size?: number }) => [
        'v1',
        'subscribe',
        'list',
        'event',
        { offset, size },
      ],
      eventSubscribe: ({ eventId }: { eventId: string }) => ['v1', 'subscribe', 'event', { eventId }],
      artistSubscribe: ({ artistId }: { artistId: string }) => ['v1', 'subscribe', 'artist', { artistId }],
      venueSubscribe: ({ venueId }: { venueId: string }) => ['v1', 'subscribe', 'venue', { venueId }],
    },
    getEventList: async (params: { offset: number; size: number }) => {
      const data = await fetchClient.GET('/v1/subscribe/event', {
        params: {
          query: params,
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getEvent: async ({ eventId }: { eventId: string }) => {
      const data = await fetchClient.GET('/v1/subscribe/event/{eventId}', {
        params: {
          path: {
            eventId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getVenue: async ({ venueId }: { venueId: string }) => {
      const data = await fetchClient.GET('/v1/subscribe/venue/{venueId}', {
        params: {
          path: {
            venueId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getArtist: async ({ artistId }: { artistId: string }) => {
      const data = await fetchClient.GET('/v1/subscribe/artist/{artistId}', {
        params: {
          path: {
            artistId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    subscribeEvent: async (params: { eventId: string }) => {
      const data = await fetchClient.POST('/v1/subscribe/event', {
        body: {
          eventId: params.eventId,
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    unsubscribeEvent: async (params: { eventId: string }) => {
      const data = await fetchClient.DELETE('/v1/subscribe/event', {
        body: {
          eventId: params.eventId,
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    subscribeArtist: async (params: { artistId: string }) => {
      const data = await fetchClient.POST('/v1/subscribe/artist', {
        body: {
          artistId: params.artistId,
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    unsubscribeArtist: async (params: { artistId: string }) => {
      const data = await fetchClient.DELETE('/v1/subscribe/artist', {
        body: {
          artistId: params.artistId,
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    subscribeVenue: async (params: { venueId: string }) => {
      const data = await fetchClient.POST('/v1/subscribe/venue', {
        body: {
          venueId: params.venueId,
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    unsubscribeVenue: async (params: { venueId: string }) => {
      const data = await fetchClient.DELETE('/v1/subscribe/venue', {
        body: {
          venueId: params.venueId,
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
      all: ['v1', 'ticket'],
      list: ({ eventId }: { eventId: string }) => ['v1', 'ticket', 'list', { eventId }],
    },
    getList: async ({ eventId }: { eventId: string }) => {
      const data = await fetchClient.GET('/v1/ticket/', {
        params: {
          query: {
            eventId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  price: {
    queryKeys: {
      all: ['v1', 'price'],
      list: ({ ticketId }: { ticketId: string }) => ['v1', 'price', 'list', { ticketId }],
    },
    getList: async ({ ticketId }: { ticketId: string }) => {
      const data = await fetchClient.GET('/v1/price/', {
        params: {
          query: {
            ticketId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  event: {
    queryKeys: {
      all: ['v1', 'event'],
      list: ({
        latitude,
        longitude,
        offset,
        size,
      }: {
        latitude: number
        longitude: number
        offset?: number
        size?: number
      }) => ['v1', 'event', ' list', { latitude, longitude, offset, size }],
      detail: ({ eventId }: { eventId: string }) => ['v1', 'event', 'detail', { eventId }],
    },
    getList: async ({
      latitude,
      longitude,
      offset,
      size,
    }: {
      latitude: number
      longitude: number
      offset: number
      size: number
    }) => {
      const data = await fetchClient.GET('/v1/event/', {
        params: {
          query: {
            latitude: latitude,
            longitude: longitude,
            offset: offset,
            size: size,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getDetail: async ({ eventId }: { eventId: string }) => {
      const data = await fetchClient.GET('/v1/event/{eventId}', {
        params: {
          path: {
            eventId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
}
