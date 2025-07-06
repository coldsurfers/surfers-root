import { QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let queryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (!queryClient) queryClient = makeQueryClient();
  return queryClient;
}
