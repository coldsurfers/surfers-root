import { DEFAULT_LIMIT, DEFAULT_ORDER_BY_CREATED_AT, DEFAULT_PAGE } from '@/utils/constants'
import { ApolloHydrationBoundary } from 'libs/apollo-hydration-boundary'
import { initializeApollo } from 'libs/use-apollo'
import { cookies } from 'next/headers'
import { ConcertListDocument } from 'src/__generated__/graphql'
import { authUtils } from '../utils'
import { RootPageClient } from './page.client'

export default async function RootPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const client = initializeApollo({
    token: accessToken,
  })

  // Fetch data on the server side
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
    })
  } catch (e) {
    console.error(e)
    authUtils.logout()
  }

  const initialApolloState = client.cache.extract()

  return (
    <ApolloHydrationBoundary initialState={JSON.parse(JSON.stringify(initialApolloState))}>
      <RootPageClient />
    </ApolloHydrationBoundary>
  )
}
