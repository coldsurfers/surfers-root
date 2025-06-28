import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createApolloClient } from 'libs/create-apollo-client/create-apollo-client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function initializeApollo({
  initialState,
  accessToken,
  refreshToken,
}: { initialState?: object; accessToken?: string; refreshToken?: string }) {
  const _apolloClient =
    apolloClient ??
    createApolloClient({
      accessToken,
      refreshToken,
    });

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo({
  initialState,
  accessToken,
  refreshToken,
}: { initialState?: object; accessToken?: string; refreshToken?: string }) {
  return useMemo(
    () => initializeApollo({ initialState, accessToken, refreshToken }),
    [initialState, accessToken, refreshToken]
  );
}
