import { apiClient } from '@/lib/api/openapi-client'
import { components } from '@/types/api'
import { OpenApiError } from '@coldsurfers/api-sdk'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useToggleSubscribeConcert = () => {
  const queryClient = useQueryClient()

  const { mutate: mutateSubscribeConcert } = useMutation<
    components['schemas']['EventSubscribeDTOSchema'],
    OpenApiError,
    { eventId: string }
  >({
    mutationFn: (variables) => apiClient.subscribe.subscribeEvent({ eventId: variables.eventId }),
    onMutate: async (variables) => {
      const { eventId } = variables

      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      })
      // @todo: fix this date and subscribe response schema type
      const newSubscribedConcert = {
        eventId,
        subscribedAt: new Date().toISOString(),
        userId: '',
      } satisfies components['schemas']['EventSubscribeDTOSchema']
      queryClient.setQueryData(apiClient.subscribe.queryKeys.eventSubscribe({ eventId }), newSubscribedConcert)

      return newSubscribedConcert
    },
    onSettled: async (data) => {
      if (!data) {
        return
      }
      const { eventId } = data
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      })
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.infoMe,
      })
    },
  })
  const { mutate: mutateUnsubscribeConcert } = useMutation<
    components['schemas']['EventSubscribeDTOSchema'],
    OpenApiError,
    { eventId: string }
  >({
    mutationFn: (variables) => apiClient.subscribe.unsubscribeEvent({ eventId: variables.eventId }),
    onMutate: async (variables) => {
      const { eventId } = variables
      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      })
      queryClient.setQueryData(apiClient.subscribe.queryKeys.eventSubscribe({ eventId }), null)

      return null
    },
    onSettled: (data) => {
      if (!data) {
        return
      }
      const { eventId } = data
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      })
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.infoMe,
      })
    },
  })

  const subscribeConcert = useCallback(
    ({ isSubscribed, eventId }: { isSubscribed: boolean; eventId: string }) => {
      if (isSubscribed) {
        mutateUnsubscribeConcert({
          eventId,
        })
      } else {
        mutateSubscribeConcert({
          eventId,
        })
      }
    },
    [mutateSubscribeConcert, mutateUnsubscribeConcert],
  )

  return subscribeConcert
}
