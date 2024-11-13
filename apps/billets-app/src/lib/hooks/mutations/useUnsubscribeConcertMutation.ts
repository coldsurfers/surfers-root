import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import client from '../../api/openapi-client'

const mutationFn = async ({ id }: { id: string }) => {
  const data = await client.DELETE('/v1/subscribe/concert/{id}', {
    params: {
      path: {
        id,
      },
    },
    body: {
      id,
    },
  })
  return data.data
}

type Options = UseMutationOptions<Awaited<ReturnType<typeof mutationFn>>, Error, { id: string }>

export default function useUnsubscribeConcertMutation(options?: Options) {
  return useMutation({
    mutationFn,
    ...options,
  })
}
