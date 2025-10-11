import createFetchClient, { type Client, type Middleware } from 'openapi-fetch';
import type { components, paths } from '../types/api';
import { OpenApiError } from './error';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

type FetchClient = Client<paths, `${string}/${string}`>;

export const getApiClient = (baseFetchClient: FetchClient) => {
  const apiClient = {
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
          latitude?: number;
          longitude?: number;
          offset?: number;
          size?: number;
          locationCityId?: string;
          eventCategoryName?: string;
          locationCityName?: string;
        }) => [
          'event',
          'list',
          {
            latitude,
            longitude,
            offset,
            size,
            locationCityId,
            eventCategoryName,
            locationCityName,
          },
        ],
        detail: (id: string) => ['event', 'detail', id],
        detailBySlug: (slug: string) => ['event', 'detail', 'slug', slug],
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
        offset: number;
        size: number;
        latitude?: number;
        longitude?: number;
        locationCityId?: string;
        eventCategoryName?: string;
        locationCityName?: string;
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
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
      getEventDetail: async (id: string) => {
        const response = await baseFetchClient.GET('/v1/event/{eventId}', {
          params: {
            path: {
              eventId: id,
            },
          },
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
      getEventDetailBySlug: async (slug: string) => {
        const response = await baseFetchClient.GET('/v1/event/detail', {
          params: {
            query: {
              slug,
            },
          },
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
    eventCategory: {
      queryKeys: {
        all: ['event-category'],
        list: ['event-category', 'list'],
      },
      getEventCategories: async () => {
        const response = await baseFetchClient.GET('/v1/event-category/');
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
    location: {
      queryKeys: {
        all: ['location'],
        countries: ['location', 'countries'],
        concerts: (queryParams: {
          latitude: number;
          latitudeDelta: number;
          longitude: number;
          longitudeDelta: number;
          zoomLevel: number;
        }) => ['location', 'concerts', queryParams],
      },
      getCountries: async () => {
        const response = await baseFetchClient.GET('/v1/location/country');
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
      getConcerts: async (queryParams: {
        latitude: number;
        latitudeDelta: number;
        longitude: number;
        longitudeDelta: number;
        zoomLevel: number;
      }) => {
        const response = await baseFetchClient.GET('/v1/location/concert', {
          params: {
            query: queryParams,
          },
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
    mailer: {
      sendUserVoice: async (body: components['schemas']['SendUserVoiceBodyDTOSchema']) => {
        const response = await baseFetchClient.POST('/v1/mailer/user-voice', {
          body,
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
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
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
    venue: {
      queryKeys: {
        all: ['venue'],
        detail: (venueId: string) => ['venue', 'detail', venueId],
        detailBySlug: (venueSlug: string) => ['venue', 'detail', venueSlug],
      },
      getVenueDetail: async (venueId: string) => {
        const response = await baseFetchClient.GET('/v1/venue/{id}', {
          params: {
            path: {
              id: venueId,
            },
          },
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
      getVenueDetailBySlug: async (slug: string) => {
        const response = await baseFetchClient.GET('/v1/venue/detail', {
          params: {
            query: {
              slug,
            },
          },
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
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
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
    fcm: {
      saveFcmToken: async (fcmToken: string) => {
        const response = await baseFetchClient.POST('/v1/fcm/token', {
          body: {
            fcmToken,
          },
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
    artistProfileImage: {
      queryKeys: {
        all: ['v1', 'artist-profile-image'],
        list: ({ artistId }: { artistId: string }) => [
          'v1',
          'artist-profile-image',
          'list',
          { artistId },
        ],
        detail: ({ artistProfileImageId }: { artistProfileImageId: string }) => [
          'v1',
          'artist-profile-image',
          'detail',
          { artistProfileImageId },
        ],
      },
      getList: async ({ artistId }: { artistId: string }) => {
        const data = await baseFetchClient.GET('/v1/artist-profile-image/', {
          params: {
            query: {
              artistId,
            },
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      getDetail: async ({ artistProfileImageId }: { artistProfileImageId: string }) => {
        const data = await baseFetchClient.GET('/v1/artist-profile-image/{artistProfileImageId}', {
          params: {
            path: {
              artistProfileImageId,
            },
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
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
        artistList: ({ offset, size }: { offset?: number; size?: number }) => [
          'v1',
          'subscribe',
          'list',
          'artist',
          { offset, size },
        ],
        venueList: ({ offset, size }: { offset?: number; size?: number }) => [
          'v1',
          'subscribe',
          'list',
          'venue',
          { offset, size },
        ],
        eventSubscribe: ({ eventId }: { eventId: string }) => [
          'v1',
          'subscribe',
          'event',
          { eventId },
        ],
        artistSubscribe: ({ artistId }: { artistId: string }) => [
          'v1',
          'subscribe',
          'artist',
          { artistId },
        ],
        venueSubscribe: ({ venueId }: { venueId: string }) => [
          'v1',
          'subscribe',
          'venue',
          { venueId },
        ],
        infoMe: ['v1', 'subscribe', 'me'],
      },
      getEventList: async (params: { offset: number; size: number }) => {
        const data = await baseFetchClient.GET('/v1/subscribe/event', {
          params: {
            query: params,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      getArtistList: async (params: { offset: number; size: number }) => {
        const data = await baseFetchClient.GET('/v1/subscribe/artist', {
          params: {
            query: params,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      getVenueList: async (params: { offset: number; size: number }) => {
        const data = await baseFetchClient.GET('/v1/subscribe/venue', {
          params: {
            query: params,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      getEvent: async ({ eventId }: { eventId: string }) => {
        const data = await baseFetchClient.GET('/v1/subscribe/event/{eventId}', {
          params: {
            path: {
              eventId,
            },
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      getVenue: async ({ venueId }: { venueId: string }) => {
        const data = await baseFetchClient.GET('/v1/subscribe/venue/{venueId}', {
          params: {
            path: {
              venueId,
            },
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      getArtist: async ({ artistId }: { artistId: string }) => {
        const data = await baseFetchClient.GET('/v1/subscribe/artist/{artistId}', {
          params: {
            path: {
              artistId,
            },
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      subscribeEvent: async (params: { eventId: string }) => {
        const data = await baseFetchClient.POST('/v1/subscribe/event', {
          body: {
            eventId: params.eventId,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      unsubscribeEvent: async (params: { eventId: string }) => {
        const data = await baseFetchClient.DELETE('/v1/subscribe/event', {
          body: {
            eventId: params.eventId,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      subscribeArtist: async (params: { artistId: string }) => {
        const data = await baseFetchClient.POST('/v1/subscribe/artist', {
          body: {
            artistId: params.artistId,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      unsubscribeArtist: async (params: { artistId: string }) => {
        const data = await baseFetchClient.DELETE('/v1/subscribe/artist', {
          body: {
            artistId: params.artistId,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      subscribeVenue: async (params: { venueId: string }) => {
        const data = await baseFetchClient.POST('/v1/subscribe/venue', {
          body: {
            venueId: params.venueId,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      unsubscribeVenue: async (params: { venueId: string }) => {
        const data = await baseFetchClient.DELETE('/v1/subscribe/venue', {
          body: {
            venueId: params.venueId,
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      getInfoMe: async () => {
        const data = await baseFetchClient.GET('/v1/subscribe/me');
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
    },
    user: {
      queryKeys: {
        all: ['v1', 'user'],
        me: ['v1', 'user', 'me'],
        profile: (handle: string) => ['v1', 'user', 'profile', handle],
      },
      getMe: async () => {
        const data = await baseFetchClient.GET('/v1/user/me');
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      activate: async (
        body: paths['/v1/user/activate']['patch']['requestBody']['content']['application/json']
      ) => {
        const data = await baseFetchClient.PATCH('/v1/user/activate', {
          body: body,
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      deactivate: async () => {
        const data = await baseFetchClient.DELETE('/v1/user/deactivate', {
          body: {
            type: 'deactivate',
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      getUserProfile: async (handle: string) => {
        const data = await baseFetchClient.GET('/v1/user/{handle}', {
          params: {
            path: {
              handle,
            },
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
    },
    price: {
      queryKeys: {
        all: ['v1', 'price'],
        list: ({ ticketId }: { ticketId: string }) => ['v1', 'price', 'list', { ticketId }],
      },
      getList: async ({ ticketId }: { ticketId: string }) => {
        const data = await baseFetchClient.GET('/v1/price/', {
          params: {
            query: {
              ticketId,
            },
          },
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
    },
    auth: {
      sendAuthCode: async (
        body: paths['/v1/auth/email/send-auth-code']['post']['requestBody']['content']['application/json']
      ) => {
        const data = await baseFetchClient.POST('/v1/auth/email/send-auth-code', {
          body,
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      confirmAuthCode: async (
        body: paths['/v1/auth/email/confirm-auth-code']['post']['requestBody']['content']['application/json']
      ) => {
        const data = await baseFetchClient.POST('/v1/auth/email/confirm-auth-code', {
          body,
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      signup: async (
        body: paths['/v1/auth/signup']['post']['requestBody']['content']['application/json']
      ) => {
        const data = await baseFetchClient.POST('/v1/auth/signup', {
          body,
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      signIn: async (
        body: paths['/v1/auth/signin']['post']['requestBody']['content']['application/json']
      ) => {
        const data = await baseFetchClient.POST('/v1/auth/signin', {
          body,
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
      reissueToken: async (
        body: paths['/v1/auth/reissue-token']['post']['requestBody']['content']['application/json']
      ) => {
        const data = await baseFetchClient.POST('/v1/auth/reissue-token', {
          body,
        });
        if (data.error) {
          throw new OpenApiError(data.error);
        }
        return data.data;
      },
    },
    search: {
      queryKeys: {
        all: ['v1', 'search'],
        list: (keyword: string) => ['v1', 'search', { keyword }],
      },
      getSearchResult: async (keyword: string) => {
        const response = await baseFetchClient.GET('/v1/search/', {
          params: {
            query: {
              keyword,
            },
          },
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
    app: {
      queryKeys: {
        all: ['v1', 'app'],
        updateInfo: ['v1', 'app', 'update-info'],
        remoteAppManifest: ['v1', 'app', 'remote-app-manifest'],
      },
      getAppUpdateInfo: async () => {
        const response = await baseFetchClient.GET('/v1/app/update-info');
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
      getRemoteAppManifest: async () => {
        const response = await baseFetchClient.GET('/v1/app/remote-app-manifest');
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
    partner: {
      sendPartnerContactForm: async (
        body: components['schemas']['PartnerContactFormDTOSchema']
      ) => {
        const response = await baseFetchClient.POST('/v1/partner/', {
          body,
        });
        if (response.error) {
          throw new OpenApiError(response.error);
        }
        return response.data;
      },
    },
  } as const;
  return apiClient;
};

export class ApiSdk {
  public baseFetchClient: FetchClient;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseFetchClient = createFetchClient<paths>({
      baseUrl: baseUrl,
      headers: DEFAULT_HEADERS,
    });
  }

  public createSdk() {
    return getApiClient(this.baseFetchClient);
  }

  public addMiddlewares(callback: (apiClient: ReturnType<typeof getApiClient>) => Middleware[]) {
    this.baseFetchClient.use(...callback(getApiClient(this.baseFetchClient)));
    return this;
  }
}
