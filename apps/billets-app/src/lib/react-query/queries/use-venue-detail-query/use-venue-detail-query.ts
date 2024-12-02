import client from '@/lib/api/openapi-client'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const queryFn = async ({ id }: { id: string }) => {
  const response = await client.GET('/v1/venue/{id}', {
    params: {
      path: {
        id,
      },
    },
  })
  return response
}

type TData = Awaited<ReturnType<typeof queryFn>>

type Options = UseQueryOptions<TData>

export const useVenueDetailQuery = ({ id }: { id: string }, options?: Options) => {
  return useQuery({
    ...options,
    queryFn: async () => await queryFn({ id }),
    queryKey: v1QueryKeyFactory.venues.detail({ id }).queryKey,
  })
}
