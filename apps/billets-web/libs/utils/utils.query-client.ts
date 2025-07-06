import { QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        retry: false,
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
