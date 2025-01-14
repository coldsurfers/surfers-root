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
  queryKeys: {
    subscribe: {
      concert: {
        all: ['v1', 'subscribe', 'concert'],
        list: {
          all: ['v1', 'subscribe', 'concert', 'list'],
          paginated: ['v1', 'subscribe', 'concert', 'list', 'paginated'],
        },
        detail: (id: string) => ['v1', 'subscribe', 'concert', 'detail', id],
      },
      artist: {
        all: ['v1', 'subscribe', 'artist'],
        detail: (id: string) => ['v1', 'subscribe', 'artist', 'detail', id],
      },
      venue: {
        all: ['v1', 'subscribe', 'venue'],
        detail: (id: string) => ['v1', 'subscribe', 'venue', 'detail', id],
      },
    },
  },
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
    getSubscribedConcerts: async (params: { offset: number; size: number }) => {
      const data = await fetchClient.GET('/v1/subscribe/concert', {
        params: {
          query: {
            ...params,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getSubscribedConcert: async (id: string) => {
      const data = await fetchClient.GET('/v1/subscribe/concert/{id}', {
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
    getSubscribedVenue: async (id: string) => {
      const data = await fetchClient.GET('/v1/subscribe/venue/{id}', {
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
    getSubscribedArtist: async (id: string) => {
      const data = await fetchClient.GET('/v1/subscribe/artist/{id}', {
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
    subscribeConcert: async (params: { id: string }) => {
      const data = await fetchClient.POST('/v1/subscribe/concert/{id}', {
        params: {
          path: {
            id: params.id,
          },
        },
        body: {
          id: params.id,
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    unsubscribeConcert: async (params: { id: string }) => {
      const data = await fetchClient.DELETE('/v1/subscribe/concert/{id}', {
        params: {
          path: {
            id: params.id,
          },
        },
        body: {
          id: params.id,
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    subscribeArtist: async (params: { id: string }) => {
      const data = await fetchClient.POST('/v1/subscribe/artist/{id}', {
        params: {
          path: {
            id: params.id,
          },
        },
        body: {
          type: 'subscribe-artist',
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    unsubscribeArtist: async (params: { id: string }) => {
      const data = await fetchClient.DELETE('/v1/subscribe/artist/{id}', {
        params: {
          path: {
            id: params.id,
          },
        },
        body: {
          type: 'unsubscribe-artist',
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    subscribeVenue: async (params: { id: string }) => {
      const data = await fetchClient.POST('/v1/subscribe/venue/{id}', {
        params: {
          path: {
            id: params.id,
          },
        },
        body: {
          type: 'subscribe-venue',
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    unsubscribeVenue: async (params: { id: string }) => {
      const data = await fetchClient.DELETE('/v1/subscribe/venue/{id}', {
        params: {
          path: {
            id: params.id,
          },
        },
        body: {
          type: 'unsubscribe-venue',
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
