import client from '@/lib/api/openapi-client'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const queryFn = async ({ id }: { id: string }) => {
  const response = await client.GET('/v1/artist/{id}', {
    params: {
      path: {
        id,
      },
    },
  })
  return response
}

type TData = Awaited<ReturnType<typeof queryFn>>
type TError = unknown
type Options = UseQueryOptions<TData, TError>

export const useArtistQuery = ({ id }: { id: string }, options?: Options) => {
  return useQuery<TData, TError>({
    ...options,
    queryFn: async () => {
      const response = await client.GET('/v1/artist/{id}', {
        params: {
          path: {
            id,
          },
        },
      })
      return response
    },
    queryKey: v1QueryKeyFactory.artists.detail({ id }).queryKey,
  })
}
