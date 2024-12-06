import { ApolloHydrationBoundary, initializeApollo } from '@/libs'
import { COOKIE_ACCESS_TOKEN_KEY } from '@/utils/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { MeDocument, MeQuery } from 'src/__generated__/graphql'

export default async function AuthLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value
  const apolloClient = initializeApollo({ token: accessToken })

  let redirectPath: string | null = null
  try {
    const response = await apolloClient.query<MeQuery>({
      query: MeDocument,
    })
    if (response.data.me?.__typename === 'User') {
      redirectPath = '/'
    }
  } catch (e) {
    console.error(e)
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }

  const initialState = JSON.parse(JSON.stringify(apolloClient.cache.extract()))

  return <ApolloHydrationBoundary initialState={initialState}>{children}</ApolloHydrationBoundary>
}
