import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { v1QueryKeyFactory } from '../../query-key-factory'
import client from '../../api/openapi-client'

const queryFn = async ({ concertId }: { concertId: string }) => {
  const data = await client.GET('/v1/subscribe/concert/{id}', {
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
