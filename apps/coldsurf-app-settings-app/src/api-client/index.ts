import { createOpenapiClient } from '@coldsurfers/openapi-client/native';

import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const apiClient = createOpenapiClient({
  // @TODO: conditional baseUrl
  baseUrl: 'https://api.billets.coldsurf.io',
  queryClient,
});
