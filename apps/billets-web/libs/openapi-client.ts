import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'
import { components, paths } from '../types/api'
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
      list: ({
        latitude,
        longitude,
        offset,
        size,
        locationCityId,
        eventCategoryName,
        locationCityName,
      }: {
        latitude?: number
        longitude?: number
        offset?: number
        size?: number
        locationCityId?: string
        eventCategoryName?: string
        locationCityName?: string
      }) => [
        'event',
        'list',
        { latitude, longitude, offset, size, locationCityId, eventCategoryName, locationCityName },
      ],
      detail: (id: string) => ['event', 'detail', id],
    },
    getEvents: async ({
      offset,
      size,
      latitude,
      longitude,
      locationCityId,
      eventCategoryName,
      locationCityName,
    }: {
      offset: number
      size: number
      latitude?: number
      longitude?: number
      locationCityId?: string
      eventCategoryName?: string
      locationCityName?: string
    }) => {
      const response = await baseFetchClient.GET('/v1/event/', {
        params: {
          query: {
            offset,
            size,
            latitude,
            longitude,
            locationCityId,
            eventCategoryName,
            locationCityName,
          },
        },
        next: {
          revalidate: 60 * 60,
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
        next: {
          revalidate: 60 * 60,
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
  eventCategory: {
    queryKeys: {
      all: ['event-category'],
      list: ['event-category', 'list'],
    },
    getEventCategories: async () => {
      const response = await baseFetchClient.GET('/v1/event-category/', {
        next: {
          revalidate: 60 * 60,
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
      country: {
        all: ['country'],
        list: ['country', 'list'],
      },
    },
    getCountries: async () => {
      const response = await baseFetchClient.GET('/v1/location/country', {
        next: {
          revalidate: 60 * 60,
        },
      })
      if (response.error) {
        throw new OpenApiError(response.error)
      }
      return response.data
    },
  },
  mailer: {
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
  venue: {
    queryKeys: {
      all: ['venue'],
      detail: (venueId: string) => ['venue', 'detail', venueId],
    },
    getVenueDetail: async (venueId: string) => {
      const response = await baseFetchClient.GET('/v1/venue/{id}', {
        params: {
          path: {
            id: venueId,
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
      detail: (artistId: string) => ['artist', 'detail', artistId],
    },
    getArtistDetail: async (artistId: string) => {
      const response = await baseFetchClient.GET('/v1/artist/{id}', {
        params: {
          path: {
            id: artistId,
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

export const initialPageQuery = {
  home: () => {
    const size = 20
    return {
      queryKey: apiClient.event.queryKeys.list({ offset: 0, size }),
      queryFn: () =>
        apiClient.event.getEvents({
          offset: 0,
          size,
        }),
    }
  },
  venueDetail: (venueId: string) => {
    return {
      queryKey: apiClient.venue.queryKeys.detail(venueId),
      queryFn: () => apiClient.venue.getVenueDetail(venueId),
    }
  },
  eventCategories: () => {
    return {
      queryKey: apiClient.eventCategory.queryKeys.list,
      queryFn: () => apiClient.eventCategory.getEventCategories(),
    }
  },
  eventDetail: (eventId: string) => {
    return {
      queryKey: apiClient.event.queryKeys.detail(eventId),
      queryFn: () => apiClient.event.getEventDetail(eventId),
    }
  },
  artistDetail: (artistId: string) => {
    return {
      queryKey: apiClient.artist.queryKeys.detail(artistId),
      queryFn: () => apiClient.artist.getArtistDetail(artistId),
    }
  },
  getCountries: () => {
    return {
      queryKey: apiClient.location.queryKeys.country.list,
      queryFn: () => apiClient.location.getCountries(),
    }
  },
  browseEvents: ({
    cityName,
    eventCategoryName,
  }: {
    cityName: components['schemas']['LocationCityDTOSchema']['name']
    eventCategoryName?: components['schemas']['EventCategoryDTOSchema']['name']
  }) => {
    const size = 20
    return {
      initialPageParam: 0,
      queryKey: apiClient.event.queryKeys.list({
        offset: 0,
        size,
        locationCityName: cityName,
        eventCategoryName,
      }),
      queryFn: ({ pageParam = 0 }) => {
        return apiClient.event.getEvents({
          offset: pageParam,
          size,
          locationCityName: cityName,
          eventCategoryName,
        })
      },
      getNextPageParam: (
        lastPage: {
          data: components['schemas']['ConcertDTOSchema']
          type: 'concert'
        }[],
        allPages: {
          data: components['schemas']['ConcertDTOSchema']
          type: 'concert'
        }[][],
      ) => {
        return lastPage.length > 0 ? allPages.length * size : undefined
      },
      throwOnError: true,
    }
  },
}
