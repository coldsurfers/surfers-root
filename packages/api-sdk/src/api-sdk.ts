import createFetchClient from 'openapi-fetch'
import { paths } from '../types/api'
import { OpenApiError } from './error'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

export class ApiSdk {
  public createSdk({ baseUrl }: { baseUrl: string }) {
    const baseFetchClient = createFetchClient<paths>({
      baseUrl: baseUrl,
      headers: DEFAULT_HEADERS,
    })
    return {
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
      eventCategory: {
        queryKeys: {
          all: ['event-category'],
          list: ['event-category', 'list'],
        },
        getEventCategories: async () => {
          const response = await baseFetchClient.GET('/v1/event-category/')
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
          const response = await baseFetchClient.GET('/v1/location/country')
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
    } as const
  }
}
