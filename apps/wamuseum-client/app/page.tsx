import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY,
  DEFAULT_LIMIT,
  DEFAULT_ORDER_BY_CREATED_AT,
  DEFAULT_PAGE,
} from '@/utils/constants';
import { ApolloHydrationBoundary } from 'libs/apollo-hydration-boundary';
import { initializeApollo } from 'libs/use-apollo';
import { cookies } from 'next/headers';
import { ConcertListDocument } from 'src/__generated__/graphql';
import { RootPageClient } from './page.client';

export default async function RootPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(COOKIE_REFRESH_TOKEN_KEY)?.value;
  const client = initializeApollo({
    accessToken,
    refreshToken,
  });

  try {
    await client.query({
      query: ConcertListDocument,
      variables: {
        page: DEFAULT_PAGE,
        limit: DEFAULT_LIMIT,
        orderBy: {
          createdAt: DEFAULT_ORDER_BY_CREATED_AT,
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  const initialApolloState = client.cache.extract();

  return (
    <ApolloHydrationBoundary initialState={JSON.parse(JSON.stringify(initialApolloState))}>
      <RootPageClient />
    </ApolloHydrationBoundary>
  );
}
