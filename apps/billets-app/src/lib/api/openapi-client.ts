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
    user: {
      all: ['v1', 'user'],
      me: ['v1', 'user', 'me'],
    },
    artist: {
      all: ['v1', 'artist'],
      allList: ['v1', 'artist', 'list'],
      listByConcertId: (concertId: string) => ['v1', 'artist', 'list', { concertId }],
      detail: (id: string) => ['v1', 'artist', 'detail', id],
    },
    artistProfileImage: {
      all: ['v1', 'artist-profile-image'],
      allList: ['v1', 'artist-profile-image', 'list'],
      listByArtistId: (artistId: string) => ['v1', 'artist-profile-image', 'list', { artistId }],
    },
    subscribe: {
      concert: {
        all: ['v1', 'subscribe', 'concert'],
        list: () => ['v1', 'subscribe', 'concert', 'list'],
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
    concert: {
      all: ['v1', 'concert'],
      list: {
        all: ['v1', 'concert', 'list'],
        paginated: {
          byLocation: (params: { latitude: number; longitude: number }) => [
            'v1',
            'concert',
            'list',
            'paginated',
            params,
          ],
          byArtistId: (artistId: string) => ['v1', 'concert', 'list', 'paginated', { artistId }],
          byVenueId: (venueId: string) => ['v1', 'concert', 'list', 'paginated', { venueId }],
        },
        byLocation: (params: { latitude: number; longitude: number }) => ['v1', 'concert', 'list', params],
        byArtistId: (artistId: string) => ['v1', 'concert', 'list', { artistId }],
        byVenueId: (venueId: string) => ['v1', 'concert', 'list', { venueId }],
      },
      detail: (id: string) => ['v1', 'concert', 'detail', id],
    },
    venue: {
      all: ['v1', 'venue'],
      allList: ['v1', 'venue', 'list'],
      listByConcertId: (concertId: string) => ['v1', 'venue', 'list', { concertId }],
      detail: (venueId: string) => ['v1', 'venue', 'detail', { venueId }],
    },
    poster: {
      all: ['v1', 'poster'],
      allList: ['v1', 'poster', 'list'],
      listByConcertId: (concertId: string) => ['v1', 'poster', 'list', { concertId }],
    },
    copyright: {
      all: ['v1', 'copyright'],
      detail: ['v1', 'copyright', 'detail'],
      detailByArtistProfileImageId: (artistProfileImageId: string) => [
        'v1',
        'copyright',
        'detailByArtistProfileImageId',
        { artistProfileImageId },
      ],
    },
    ticket: {
      all: ['v1', 'ticket'],
      allList: ['v1', 'ticket', 'list'],
      listByConcertId: (concertId: string) => ['v1', 'ticket', 'list', { concertId }],
    },
    price: {
      all: ['v1', 'price'],
      allList: ['v1', 'price', 'list'],
      listByTicketId: (ticketId: string) => ['v1', 'price', 'list', { ticketId }],
    },
  },
  user: {
    getMe: async () => {
      const data = await fetchClient.GET('/v1/user/me')
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  artist: {
    getArtistsByConcertId: async (concertId: string) => {
      const data = await fetchClient.GET('/v1/artist/concert/{concertId}', {
        params: {
          path: {
            concertId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
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
    getArtistProfileImagesByArtistId: async (artistId: string) => {
      const data = await fetchClient.GET('/v1/artist-profile-image/artist/{artistId}', {
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
  },
  concert: {
    getConcertDetail: async (id: string) => {
      const data = await fetchClient.GET('/v1/concert/{id}', {
        params: {
          path: {
            id,
          },
        },
      })
      if (data.error) {
        // @todo: need to add error response type on server side
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getConcerts: async ({
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
      const data = await fetchClient.GET('/v1/concert/', {
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
        // @todo: need to add error response type on server side
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getConcertsByArtistId: async (params: { artistId: string; offset?: number; size?: number }) => {
      const data = await fetchClient.GET('/v1/artist/concert-list/{artistId}', {
        params: {
          path: {
            artistId: params.artistId,
          },
          query: {
            offset: params.offset,
            size: params.size,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
    },
    getConcertsByVenueId: async (params: { venueId: string; offset?: number; size?: number }) => {
      const data = await fetchClient.GET('/v1/venue/concert-list/{venueId}', {
        params: {
          path: {
            venueId: params.venueId,
          },
          query: {
            offset: params.offset,
            size: params.size,
          },
        },
      })
      if (data.error) {
        // @todo: need to add error response type on server side
        throw new OpenApiError(data.error)
      }
      return data.data
    },
  },
  copyright: {
    getCopyrightByArtistProfileImageId: async (artistProfileImageId: string) => {
      const data = await fetchClient.GET('/v1/copyright/artist-profile-image/{artistProfileImageId}', {
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
    getVenuesByConcertId: async (concertId: string) => {
      const data = await fetchClient.GET('/v1/venue/concert/{concertId}', {
        params: {
          path: {
            concertId,
          },
        },
      })
      if (data.error) {
        throw new OpenApiError(data.error)
      }
      return data.data
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
    getPostersByConcertId: async (concertId: string) => {
      const data = await fetchClient.GET('/v1/poster/concert/{concertId}', {
        params: {
          path: {
            concertId,
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
    getTicketsByConcertId: async (concertId: string) => {
      const data = await fetchClient.GET('/v1/ticket/concert/{concertId}', {
        params: {
          path: {
            concertId,
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
    getPricesByTicketId: async (ticketId: string) => {
      const data = await fetchClient.GET('/v1/price/ticket/{ticketId}', {
        params: {
          path: {
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
}
