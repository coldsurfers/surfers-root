import { fetchClient } from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/api/openapi-error'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type Options = UseQueryOptions<Awaited<ReturnType<typeof queryFn>>, OpenApiError>

const queryFn = async ({ venueId }: { venueId: string }) => {
  const response = await fetchClient.GET('/v1/subscribe/venue/{id}', {
    params: {
      path: {
        id: venueId,
      },
    },
  })
  if (response.error) {
    throw new OpenApiError(response.error)
  }
  return response.data
}

export const useSubscribeVenueQuery = ({ venueId }: { venueId: string }, options?: Options) => {
  return useQuery({
    ...options,
    queryFn: async () => await queryFn({ venueId }),
    queryKey: v1QueryKeyFactory.venues.subscribed({ venueId }).queryKey,
  })
}
