import storage from '@/utils/storage/storage';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { urls } from 'libs/constants';

export const createApolloClient = ({
  accessToken,
  refreshToken,
}: { accessToken?: string; refreshToken?: string }) => {
  const httpLink = new HttpLink({
    uri: urls.apolloServer,
    credentials: 'include',
  });

  const authLink = setContext(async (_, { headers }) => {
    const authorization =
      typeof window === 'undefined'
        ? accessToken
        : storage?.get<string>('@wamuseum-client/access-token');
    return {
      headers: {
        ...headers,
        authorization,
      },
    };
  });

  // eslint-disable-next-line consistent-return
  const errorLink = onError((errorLinkProps) => {
    // console.log('error occurred', errorLinkProps.graphQLErrors?.at(0));
    const gqlError = errorLinkProps.graphQLErrors?.at(0);
    const code = gqlError?.extensions?.code;
    if (code === 401) {
      console.log('should refresh token');
    }
    // if (graphQLErrors) {
    //   for (const err of graphQLErrors) {
    //     switch (err.extensions?.code) {
    //       // Apollo Server sets code to UNAUTHENTICATED
    //       // when an AuthenticationError is thrown in a resolver
    //       case 401:
    //         if (storage?.get<string>('@wamuseum-client/auth-token')) {
    //           storage.remove('@wamuseum-client/auth-token')
    //         }
    //         if (
    //           typeof document !== 'undefined' &&
    //           NON_AUTH_PATH_WHITE_LIST.every((value) => document.location.pathname !== value)
    //         ) {
    //           document.location.href = '/auth/signin'
    //         }
    //         // Modify the operation context with a new token
    //         // const oldHeaders = operation.getContext().headers;
    //         // operation.setContext({
    //         //   headers: {
    //         //     ...oldHeaders,
    //         //     authorization: getNewToken(),
    //         //   },
    //         // });
    //         // Retry the request, returning the new observable
    //         // return forward(operation);
    //         return forward(operation)
    //     }
    //   }
    // }
  });

  const client = new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  });

  return client;
};
