import { fetchClient } from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/errors/openapi-error'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type Options = UseQueryOptions<Awaited<ReturnType<typeof queryFn>>, OpenApiError>

const queryFn = async ({ artistId }: { artistId: string }) => {
  const response = await fetchClient.GET('/v1/subscribe/artist/{id}', {
    params: {
      path: {
        id: artistId,
      },
    },
  })
  if (response.error) {
    throw new OpenApiError(response.error)
  }
  return response.data
}

export const useSubscribeArtistQuery = ({ artistId }: { artistId: string }, options?: Options) => {
  return useQuery({
    ...options,
    queryFn: async () => await queryFn({ artistId }),
    queryKey: v1QueryKeyFactory.artists.subscribed({ artistId }).queryKey,
  })
}
