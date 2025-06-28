import { ApolloHydrationBoundary, initializeApollo } from '@/libs';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/utils/constants';
import { cookies } from 'next/headers';
import type { PropsWithChildren } from 'react';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  const apolloClient = initializeApollo({ token: accessToken });

  const initialState = JSON.parse(JSON.stringify(apolloClient.cache.extract()));

  return <ApolloHydrationBoundary initialState={initialState}>{children}</ApolloHydrationBoundary>;
}
