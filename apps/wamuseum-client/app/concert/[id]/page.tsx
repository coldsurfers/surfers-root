import { COOKIE_ACCESS_TOKEN_KEY } from '@/utils/constants'
import { ApolloHydrationBoundary, initializeApollo } from 'libs'
import { cookies } from 'next/headers'
import {
  ConcertArtistsDocument,
  ConcertDocument,
  ConcertPosterDocument,
  ConcertTicketsDocument,
  ConcertVenuesDocument,
} from 'src/__generated__/graphql'
import { ConcertIdPageClient } from './page.client'

export default async function ConcertIdPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value
  const apolloClient = initializeApollo({ token: accessToken })
  const promises = [
    apolloClient.query({
      query: ConcertDocument,
      variables: {
        concertId: params.id,
      },
    }),
    apolloClient.query({
      query: ConcertArtistsDocument,
      variables: {
        concertId: params.id,
      },
    }),
    apolloClient.query({
      query: ConcertPosterDocument,
      variables: {
        concertId: params.id,
      },
    }),
    apolloClient.query({
      query: ConcertVenuesDocument,
      variables: {
        concertId: params.id,
      },
    }),
    apolloClient.query({
      query: ConcertTicketsDocument,
      variables: {
        concertId: params.id,
      },
    }),
  ]
  await Promise.all(promises)

  const initialState = JSON.parse(JSON.stringify(apolloClient.cache.extract()))

  return (
    <ApolloHydrationBoundary initialState={initialState}>
      <ConcertIdPageClient params={params} />
    </ApolloHydrationBoundary>
  )
}
