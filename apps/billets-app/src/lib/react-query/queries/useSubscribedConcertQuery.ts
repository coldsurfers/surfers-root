import { fetchClient } from '@/lib/api/openapi-client'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { v1QueryKeyFactory } from '../../query-key-factory'

const queryFn = async ({ concertId }: { concertId: string }) => {
  const data = await fetchClient.GET('/v1/subscribe/concert/{id}', {
    params: {
      path: {
        id: concertId,
      },
    },
  })
  return data.data ?? null
}

type Options = UseQueryOptions<Awaited<ReturnType<typeof queryFn>>>

export default function useSubscribedConcertQuery(
  {
    concertId,
  }: {
    concertId: string
  },
  options?: Options,
) {
  return useQuery({
    queryKey: v1QueryKeyFactory.concerts.subscribed({ concertId }).queryKey,
    queryFn: async () => await queryFn({ concertId }),
    ...options,
  })
}
