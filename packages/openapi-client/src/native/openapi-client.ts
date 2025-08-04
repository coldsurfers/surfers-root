import { ApiSdk, type OpenApiError, type getApiClient } from '@coldsurfers/api-sdk';
import { getAccessToken, getRefreshToken, mmkvInstance, mmkvKeys } from '@coldsurfers/native-auth';
import type { QueryClient } from '@tanstack/react-query';
import type { Middleware } from 'openapi-fetch';

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

export const createAuthMiddleware = (
  apiClient: ReturnType<typeof getApiClient>,
  queryClient: QueryClient
): Middleware => {
  return {
    async onRequest({ request }) {
      const accessToken = await getAccessToken();
      if (accessToken) {
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return request;
    },
    async onResponse({ response, request }) {
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

        mmkvInstance.set(mmkvKeys.authToken, JSON.stringify(reissued.authToken));
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
        console.error('reissue error', e);
        flushRequestQueue('', e as Error);
        mmkvInstance.delete(mmkvKeys.authToken);
        queryClient.resetQueries();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    },
  };
};

export const createOpenapiClient = ({
  baseUrl,
  queryClient,
}: {
  baseUrl: string;
  queryClient: QueryClient;
}) =>
  new ApiSdk({
    baseUrl,
  })
    .addMiddlewares((apiClient) => {
      return [createAuthMiddleware(apiClient, queryClient)];
    })
    .createSdk();
