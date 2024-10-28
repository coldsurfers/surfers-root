import { ApolloProvider } from '@apollo/client'
import { PropsWithChildren } from 'react'
import client from '../../gql/client'

export default function ApolloProviderRegistry({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
