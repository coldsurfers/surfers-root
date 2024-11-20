import storage from '@/utils/storage/storage'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { urls } from 'libs/constants'
import { AuthToken } from 'src/__generated__/graphql'

export const createApolloClient = ({ token }: { token?: string }) => {
  const NON_AUTH_PATH_WHITE_LIST = ['/auth/signin', '/auth/request']

  const httpLink = new HttpLink({
    uri: urls.apolloServer,
  })

  const authLink = setContext(async (_, { headers }) => {
    const accessToken =
      typeof window === 'undefined' ? token : storage?.get<AuthToken>('@wamuseum-client/auth-token')?.accessToken
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `${accessToken}` : '',
      },
    }
  })

  // eslint-disable-next-line consistent-return
  const errorLink = onError(({ graphQLErrors, forward, operation }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case 401:
            if (storage?.get<string>('@wamuseum-client/auth-token')) {
              storage.remove('@wamuseum-client/auth-token')
            }
            if (
              typeof document !== 'undefined' &&
              NON_AUTH_PATH_WHITE_LIST.every((value) => document.location.pathname !== value)
            ) {
              document.location.href = '/auth/signin'
            }
            // Modify the operation context with a new token
            // const oldHeaders = operation.getContext().headers;
            // operation.setContext({
            //   headers: {
            //     ...oldHeaders,
            //     authorization: getNewToken(),
            //   },
            // });
            // Retry the request, returning the new observable
            // return forward(operation);
            return forward(operation)
        }
      }
    }
  })

  const client = new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  })

  return client
}
