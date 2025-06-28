import storage from '@/utils/storage/storage';
import { authUtils } from '@/utils/utils.auth';
import {
  ApolloClient,
  type FetchResult,
  HttpLink,
  InMemoryCache,
  type Observable,
  fromPromise,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { urls } from 'libs/constants';

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

const resolvePendingRequests = (accessToken: string) => {
  pendingRequests.forEach((callback) => callback(accessToken));
  pendingRequests = [];
};

export const createApolloClient = ({
  accessToken,
  refreshToken,
}: { accessToken?: string; refreshToken?: string }) => {
  const httpLink = new HttpLink({
    uri: urls.apolloServer,
    credentials: 'include',
  });

  const authLink = setContext(async (_, { headers }) => {
    // SSR 환경에서는 전달받은 accessToken 사용, 클라이언트에서는 storage에서 읽기
    const authorization =
      typeof window === 'undefined'
        ? accessToken
        : storage?.get<string>('@wamuseum-client/access-token');
    return {
      headers: {
        ...headers,
        authorization,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        const code = err.extensions?.code;

        if (code === 401) {
          const currentRefreshToken =
            typeof window !== 'undefined'
              ? storage?.get<string>('@wamuseum-client/refresh-token')
              : refreshToken;
          if (!currentRefreshToken) {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signin';
            }
            return;
          }
          if (isRefreshing) {
            // 이미 리프레시 중이면 큐에 추가
            // biome-ignore lint/correctness/noFlatMapIdentity: <explanation>
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            return fromPromise<Observable<FetchResult<any>>>(
              new Promise((resolve) => {
                pendingRequests.push((newToken) => {
                  operation.setContext(({ headers = {} }) => ({
                    headers: {
                      ...headers,
                      authorization: `${newToken}`,
                    },
                  }));
                  resolve(forward(operation));
                });
              })
            ).flatMap((observable) => observable);
          }
          isRefreshing = true;
          return fromPromise<string>(
            fetch(`${urls.clientUrl}/api/refresh-token`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                refreshToken: currentRefreshToken,
              }),
            })
              .then(
                (res) =>
                  res.json() as Promise<{
                    authToken: { accessToken: string; refreshToken: string };
                  }>
              )
              .then((json) => {
                const newToken = json?.authToken?.accessToken;
                if (!newToken) throw new Error('No access token returned');
                if (typeof window !== 'undefined') {
                  authUtils.tokenRefresh(json.authToken);
                }
                resolvePendingRequests(newToken);
                return newToken;
              })
              .catch((err) => {
                pendingRequests = [];
                if (typeof window !== 'undefined') {
                  window.location.href = '/auth/signin';
                }
                throw err;
              })
              .finally(() => {
                isRefreshing = false;
              })
          ).flatMap((accessToken) => {
            if (accessToken) {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `${accessToken}`,
                },
              }));
            }
            return forward(operation);
          });
        }
      }
    }

    if (networkError) {
      console.error('Network error:', networkError);
    }
  });

  const client = new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  });

  return client;
};
