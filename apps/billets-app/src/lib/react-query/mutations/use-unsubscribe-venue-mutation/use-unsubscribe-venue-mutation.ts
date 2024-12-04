import client from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/api/openapi-error'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

type TVariables = {
  venueId: string
}

type Options = UseMutationOptions<Awaited<ReturnType<typeof mutationFn>>, OpenApiError, TVariables>

const mutationFn = async ({ venueId }: TVariables) => {
  const response = await client.DELETE('/v1/subscribe/venue/{id}', {
    params: {
      path: {
        id: venueId,
      },
    },
    body: {
      type: 'unsubscribe-venue',
    },
  })
  if (response.error) {
    throw new OpenApiError(response.error)
  }
  return response.data
}

export const useUnsubscribeVenueMutation = (options?: Options) => {
  return useMutation({
    ...options,
    mutationFn,
  })
}
