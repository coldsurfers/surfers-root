import { fetchClient } from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/errors/openapi-error'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const queryFn = async ({ id }: { id: string }) => {
  const response = await fetchClient.GET('/v1/artist/{id}', {
    params: {
      path: {
        id,
      },
    },
  })
  if (response.error) {
    throw new OpenApiError(response.error)
  }
  return response.data
}

type TData = Awaited<ReturnType<typeof queryFn>>
type TError = OpenApiError
type Options = UseQueryOptions<TData, TError>

export const useArtistDetailQuery = ({ id }: { id: string }, options?: Options) => {
  return useQuery<TData, TError>({
    ...options,
    queryFn: async () => await queryFn({ id }),
    queryKey: v1QueryKeyFactory.artists.detail({ id }).queryKey,
  })
}
