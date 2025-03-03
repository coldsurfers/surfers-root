import { apiClient } from '@/lib/api/openapi-client'
import { components } from '@/types/api'
import { OpenApiError } from '@coldsurfers/api-sdk'
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

type SubscribedConcertPaginatedData = InfiniteData<components['schemas']['EventSubscribeDTOSchema'], number>

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
      await queryClient.setQueryData(apiClient.subscribe.queryKeys.eventSubscribe({ eventId }), newSubscribedConcert)

      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.eventList({}),
      })
      const previousSubscribedConcertList = queryClient.getQueryData<SubscribedConcertPaginatedData>(
        apiClient.subscribe.queryKeys.eventList({}),
      )
      const newPaginatedData: SubscribedConcertPaginatedData = {
        pageParams: previousSubscribedConcertList?.pageParams ?? [0],
        pages: [newSubscribedConcert, ...(previousSubscribedConcertList?.pages.flat() ?? [])],
      }
      await queryClient.setQueryData<SubscribedConcertPaginatedData>(
        apiClient.subscribe.queryKeys.eventList({}),
        newPaginatedData,
      )

      return newSubscribedConcert
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
        queryKey: apiClient.subscribe.queryKeys.eventList({}),
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
      await queryClient.setQueryData(apiClient.subscribe.queryKeys.eventSubscribe({ eventId }), null)

      await queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventList({}),
      })
      const prevPaginatedData = queryClient.getQueryData<SubscribedConcertPaginatedData>(
        apiClient.subscribe.queryKeys.eventList({}),
      )
      const newPaginatedData: SubscribedConcertPaginatedData = {
        pageParams: prevPaginatedData?.pageParams ?? [0],
        pages: (prevPaginatedData?.pages.flat() ?? []).filter((v) => v?.eventId !== eventId),
      }
      await queryClient.setQueryData(apiClient.subscribe.queryKeys.eventList({}), newPaginatedData)
      await queryClient.setQueryData<SubscribedConcertPaginatedData>(
        apiClient.subscribe.queryKeys.eventList({}),
        newPaginatedData,
      )

      return null
    },
    onSettled: (data, variables, context) => {
      if (!data) {
        return
      }
      const { eventId } = data
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
      })
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventList({}),
      })
    },
  })

  const subscribeConcert = useCallback(
    ({ isSubscribed, concertId }: { isSubscribed: boolean; concertId: string }) => {
      if (isSubscribed) {
        mutateUnsubscribeConcert({
          eventId: concertId,
        })
      } else {
        mutateSubscribeConcert({
          eventId: concertId,
        })
      }
    },
    [mutateSubscribeConcert, mutateUnsubscribeConcert],
  )

  return subscribeConcert
}
