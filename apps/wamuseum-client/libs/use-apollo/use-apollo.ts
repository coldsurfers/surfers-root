import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createApolloClient } from 'libs/create-apollo-client/create-apollo-client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function initializeApollo({
  initialState,
  token,
}: { initialState?: object; token?: string }) {
  const _apolloClient =
    apolloClient ??
    createApolloClient({
      token,
    });

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo({ initialState, token }: { initialState?: object; token?: string }) {
  return useMemo(() => initializeApollo({ initialState, token }), [initialState, token]);
}
