import { CONCERT_QUERY } from 'gql/queries'
import { ApolloHydrationBoundary, initializeApollo } from 'libs'
import { cookies } from 'next/headers'
import { ConcertArtistsDocument, ConcertPosterDocument, ConcertVenuesDocument } from 'src/__generated__/graphql'
import { ConcertIdPageClient } from './page.client'

export default async function ConcertIdPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const apolloClient = initializeApollo({ token: accessToken })
  const promises = [
    apolloClient.query({
      query: CONCERT_QUERY,
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
  ]
  await Promise.all(promises)

  const initialState = JSON.parse(JSON.stringify(apolloClient.cache.extract()))

  return (
    <ApolloHydrationBoundary initialState={initialState}>
      <ConcertIdPageClient params={params} />
    </ApolloHydrationBoundary>
  )
}
