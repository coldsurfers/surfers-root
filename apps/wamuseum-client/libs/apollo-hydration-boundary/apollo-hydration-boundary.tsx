'use client'

import { ApolloProvider } from '@apollo/client'
import { initializeApollo } from 'libs/use-apollo'
import { PropsWithChildren } from 'react'

export const ApolloHydrationBoundary = ({ initialState, children }: PropsWithChildren<{ initialState?: object }>) => {
  const apolloClient = initializeApollo({
    initialState,
  })
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
