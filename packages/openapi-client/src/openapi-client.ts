import {
  ApiSdk,
  type OpenApiError,
  type components,
  type getApiClient,
} from '@coldsurfers/api-sdk';
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
  options: {
    getAccessTokenFunc: () => Promise<string>;
    getRefreshTokenFunc: () => Promise<string>;
    onReissueSuccess: (reissuedToken: { accessToken: string; refreshToken: string }) => void;
    onReissueError: () => Promise<void>;
  }
): Middleware => {
  return {
    onRequest: async ({ request }) => {
      // ✅ body를 안전하게 백업
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        const cloned = request.clone();
        const originalBody = await cloned.text(); // 이미 문자열로 변환
        (request as any)._originalBody = originalBody;
      }

      const accessToken = await options.getAccessTokenFunc();

      if (accessToken) {
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },
    onResponse: async ({ response, request }) => {
      if (response.status !== 401) return response;

      const refreshToken = await options.getRefreshTokenFunc();

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

        await options.onReissueSuccess(reissued.authToken);
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
        await options.onReissueError();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    },
  };
};

export const createOpenApiClient = ({
  baseUrl,
  getAccessTokenFunc,
  getRefreshTokenFunc,
  onReissueSuccess,
  onReissueError,
}: {
  baseUrl: string;
  getAccessTokenFunc: () => Promise<string>;
  getRefreshTokenFunc: () => Promise<string>;
  onReissueSuccess: (reissuedToken: { accessToken: string; refreshToken: string }) => Promise<void>;
  onReissueError: () => Promise<void>;
}) =>
  new ApiSdk({
    baseUrl,
  })
    .addMiddlewares((apiClient) => {
      return [
        createAuthMiddleware(apiClient, {
          getAccessTokenFunc,
          getRefreshTokenFunc,
          onReissueSuccess,
          onReissueError,
        }),
      ];
    })
    .createSdk();
