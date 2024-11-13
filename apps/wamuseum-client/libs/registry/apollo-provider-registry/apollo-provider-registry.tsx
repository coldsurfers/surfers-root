import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'libs'
import { PropsWithChildren } from 'react'

export function ApolloProviderRegistry({ children }: PropsWithChildren) {
  const client = useApollo({})
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
