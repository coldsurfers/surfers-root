import { ApiSdk, type OpenApiError, type components } from '@coldsurfers/api-sdk';
import type { Middleware } from 'openapi-fetch';
import { API_BASE_URL, COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from './constants';
import { useAuthStore } from './stores';
import { authUtils } from './utils/utils.auth';

let isRefreshing = false;
let requestQueue: {
  resolve: (newAccessToken: string) => void;
  reject: (error: Error) => void;
}[] = [];

function flushRequestQueue(newAccessToken: string, error?: Error) {
  // refresh 후 토큰 성공 여부에 따라 처리
  requestQueue.forEach((queuedPromise) => {
    if (error) {
      queuedPromise.reject(error);
    } else {
      queuedPromise.resolve(newAccessToken);
    }
  });
  requestQueue = [];
}

async function getRefreshToken() {
  const isSsr = typeof window === 'undefined';
  if (isSsr) {
    const cookies = (await import('next/headers')).cookies;
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_REFRESH_TOKEN_KEY)?.value ?? '';
  }
  return useAuthStore.getState().refreshToken;
}

const authMiddleware: Middleware = {
  onRequest: async ({ request }) => {
    // ✅ body를 안전하게 백업
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const cloned = request.clone();
      const originalBody = await cloned.text(); // 이미 문자열로 변환
      (request as any)._originalBody = originalBody;
    }

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
    if (response.status !== 401) return response;

    const refreshToken = await getRefreshToken();

    if (!refreshToken) return response;

    const cloned = response.clone();
    let json: OpenApiError | undefined;
    try {
      json = (await cloned.json()) as OpenApiError | undefined;
    } catch {
      return response;
    }

    if (json?.code !== 'INVALID_ACCESS_TOKEN') return response;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        requestQueue.push({
          resolve: async (accessToken) => {
            const retryResponse = await fetch(request.url, {
              method: request.method,
              headers: new Headers({
                // ...Object.fromEntries(request.headers),
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              }),
              body: (request as any)._originalBody ?? undefined,
              credentials: request.credentials,
            });

            resolve(retryResponse);
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const reissued = await apiClient.auth.reissueToken({
        refreshToken,
      });

      await authUtils.localLogin(reissued.authToken);
      flushRequestQueue(reissued.authToken.accessToken);

      const retryResponse = await fetch(request.url, {
        method: request.method,
        headers: new Headers({
          // ...Object.fromEntries(request.headers),
          'Content-Type': 'application/json',
          Authorization: `Bearer ${reissued.authToken.accessToken}`,
        }),
        body: (request as any)._originalBody ?? undefined,
        credentials: request.credentials,
      });
      return retryResponse;
    } catch (e) {
      flushRequestQueue('', e as Error);
      await authUtils.localLogout();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
};

const apiSdk = new ApiSdk({
  baseUrl: API_BASE_URL,
});

export const apiClient = apiSdk.createSdk({
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
