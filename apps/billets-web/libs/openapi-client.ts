import { ApiSdk, type OpenApiError, type components } from '@coldsurfers/api-sdk';
import type { Middleware } from 'openapi-fetch';
import { API_BASE_URL, COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from './constants';
import { useAuthStore } from './stores';
import { authUtils } from './utils/utils.auth';

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function getRefreshToken() {
  const isSsr = typeof window === 'undefined';
  if (isSsr) {
    const cookies = (await import('next/headers')).cookies;
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_REFRESH_TOKEN_KEY)?.value ?? '';
  }
  return useAuthStore.getState().refreshToken;
}

async function getRefreshedToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  const oldRefreshToken = await getRefreshToken();

  if (!oldRefreshToken) {
    isRefreshing = false;
    return null;
  }

  refreshPromise = fetchRefreshToken(oldRefreshToken)
    .then(async (tokens) => {
      authUtils.localLogin(tokens);
      return tokens.accessToken;
    })
    .catch(async (err) => {
      console.error('[authMiddleware] refresh failed:', err);
      authUtils.localLogout();
      return null;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

async function fetchRefreshToken(refreshToken: string) {
  const response = await apiClient.auth.reissueToken({
    refreshToken,
  });
  return response.authToken;
}

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
  onResponse: async ({ response, request }) => {
    if (response.status === 401) {
      const cloned = response.clone();
      let json: OpenApiError | undefined;

      try {
        json = (await cloned.json()) as OpenApiError | undefined;
      } catch {
        return response;
      }

      if (json?.code !== 'INVALID_ACCESS_TOKEN') {
        return response;
      }

      const newAccessToken = await getRefreshedToken();
      if (!newAccessToken) return response;

      const retryRequest = new Request(request.url, {
        method: request.method,
        headers: {
          ...request.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
        body: request.body,
        credentials: request.credentials,
      });

      return fetch(retryRequest);
    }

    return response;
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
