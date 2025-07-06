import { ApiSdk, type components } from '@coldsurfers/api-sdk';
import type { Middleware } from 'openapi-fetch';
import { API_BASE_URL, COOKIE_ACCESS_TOKEN_KEY } from './constants';
import { useAuthStore } from './stores';
import storage from './utils/utils.storage';

const authMiddleware: Middleware = {
  onRequest: async ({ request }) => {
    let accessToken = '';

    // ssr
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value ?? '';
    } else {
      // csr
      accessToken = useAuthStore.getState().accessToken ?? '';
    }
    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  },
};

export const apiClient = new ApiSdk().createSdk({
  baseUrl: API_BASE_URL,
  middlewares: [authMiddleware],
});

export const initialPageQuery = {
  home: () => {
    const size = 20;
    return {
      queryKey: apiClient.event.queryKeys.list({ offset: 0, size }),
      queryFn: () =>
        apiClient.event.getEvents({
          offset: 0,
          size,
        }),
    };
  },
  venueDetail: (venueId: string) => {
    return {
      queryKey: apiClient.venue.queryKeys.detail(venueId),
      queryFn: () => apiClient.venue.getVenueDetail(venueId),
    };
  },
  eventCategories: () => {
    return {
      queryKey: apiClient.eventCategory.queryKeys.list,
      queryFn: () => apiClient.eventCategory.getEventCategories(),
    };
  },
  eventDetail: (eventId: string) => {
    return {
      queryKey: apiClient.event.queryKeys.detail(eventId),
      queryFn: () => apiClient.event.getEventDetail(eventId),
    };
  },
  eventDetailBySlug: (slug: string) => {
    return {
      queryKey: apiClient.event.queryKeys.detailBySlug(slug),
      queryFn: () => apiClient.event.getEventDetailBySlug(slug),
    };
  },
  artistDetail: (artistId: string) => {
    return {
      queryKey: apiClient.artist.queryKeys.detail(artistId),
      queryFn: () => apiClient.artist.getArtistDetail(artistId),
    };
  },
  getCountries: () => {
    return {
      queryKey: apiClient.location.queryKeys.countries,
      queryFn: () => apiClient.location.getCountries(),
    };
  },
  browseEvents: ({
    cityName,
    eventCategoryName,
  }: {
    cityName: components['schemas']['LocationCityDTOSchema']['name'];
    eventCategoryName?: components['schemas']['EventCategoryDTOSchema']['name'];
  }) => {
    const size = 20;
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
        });
      },
      getNextPageParam: (
        lastPage: {
          data: components['schemas']['ConcertDTOSchema'];
          type: 'concert';
        }[],
        allPages: {
          data: components['schemas']['ConcertDTOSchema'];
          type: 'concert';
        }[][]
      ) => {
        return lastPage.length > 0 ? allPages.length * size : undefined;
      },
      throwOnError: true,
    };
  },
};
