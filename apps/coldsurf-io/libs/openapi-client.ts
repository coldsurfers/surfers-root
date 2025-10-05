import { ApiSdk, type components } from '@coldsurfers/api-sdk';
import { createAuthMiddleware } from '@coldsurfers/openapi-client';
import { API_BASE_URL, COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from './constants';
import { useAuthStore } from './stores';
import { authUtils } from './utils/utils.auth';

async function getRefreshToken() {
  const isSsr = typeof window === 'undefined';
  if (isSsr) {
    const cookies = (await import('next/headers')).cookies;
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_REFRESH_TOKEN_KEY)?.value ?? '';
  }
  return useAuthStore.getState().refreshToken;
}

export const apiClient = new ApiSdk({
  baseUrl: API_BASE_URL,
})
  .addMiddlewares((apiClient) => {
    return [
      createAuthMiddleware(apiClient, {
        getAccessTokenFunc: async () => {
          // ssr
          if (typeof window === 'undefined') {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            return cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value ?? '';
          }
          // csr
          return useAuthStore.getState().accessToken ?? '';
        },
        getRefreshTokenFunc: async () => await getRefreshToken(),
        onReissueSuccess: async (reissuedToken) => await authUtils.localLogin(reissuedToken),
        onReissueError: async () => await authUtils.localLogout(),
      }),
    ];
  })
  .createSdk();

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
  homeVenueCollection: (slug: string) => {
    return {
      queryKey: ['home-collections', slug],
      queryFn: () => apiClient.venue.getVenueDetailBySlug(slug),
    };
  },
  venueDetail: (venueId: string) => {
    return {
      queryKey: apiClient.venue.queryKeys.detail(venueId),
      queryFn: () => apiClient.venue.getVenueDetail(venueId),
    };
  },
  venueDetailBySlug: (venueSlug: string) => {
    return {
      queryKey: apiClient.venue.queryKeys.detailBySlug(venueSlug),
      queryFn: () => apiClient.venue.getVenueDetailBySlug(venueSlug),
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
