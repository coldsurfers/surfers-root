import client from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/api/openapi-error'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

type TVariables = {
  artistId: string
}

type Options = UseMutationOptions<Awaited<ReturnType<typeof mutationFn>>, OpenApiError, TVariables>

const mutationFn = async ({ artistId }: TVariables) => {
  const response = await client.DELETE('/v1/subscribe/artist/{id}', {
    params: {
      path: {
        id: artistId,
      },
    },
    body: {
      type: 'unsubscribe-artist',
    },
  })
  if (response.error) {
    throw new OpenApiError(response.error)
  }
  return response.data
}

export const useUnsubscribeArtistMutation = (options?: Options) => {
  return useMutation({
    ...options,
    mutationFn,
  })
}
