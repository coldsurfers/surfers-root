import { apiClient } from '@/lib/api/openapi-client'
import { components } from '@/types/api'
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

type SubscribedConcertPaginatedData = InfiniteData<components['schemas']['ConcertDTOSchema'], number>

export const useToggleSubscribeConcert = () => {
  const queryClient = useQueryClient()

  const { mutate: mutateSubscribeConcert } = useMutation({
    mutationFn: apiClient.subscribe.subscribeConcert,
    onMutate: async (variables) => {
      const { id: concertId } = variables

      await queryClient.cancelQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.detail(concertId),
      })
      const newSubscribedConcert = {
        id: concertId,
        date: '',
        title: '',
        mainPoster: null,
        mainVenue: null,
      } satisfies components['schemas']['ConcertDTOSchema']
      await queryClient.setQueryData(apiClient.queryKeys.subscribe.concert.detail(concertId), newSubscribedConcert)

      await queryClient.cancelQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.list.paginated,
      })
      const previousSubscribedConcertList = queryClient.getQueryData<SubscribedConcertPaginatedData>(
        apiClient.queryKeys.subscribe.concert.list.paginated,
      )
      const newPaginatedData: SubscribedConcertPaginatedData = {
        pageParams: previousSubscribedConcertList?.pageParams ?? [0],
        pages: [newSubscribedConcert, ...(previousSubscribedConcertList?.pages.flat() ?? [])],
      }
      await queryClient.setQueryData<SubscribedConcertPaginatedData>(
        apiClient.queryKeys.subscribe.concert.list.paginated,
        newPaginatedData,
      )

      return newSubscribedConcert
    },
    onSettled: (data, variables, context) => {
      if (!data) {
        return
      }
      const { id: concertId } = data
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.detail(concertId),
      })
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.list.paginated,
      })
    },
  })
  const { mutate: mutateUnsubscribeConcert } = useMutation({
    mutationFn: apiClient.subscribe.unsubscribeConcert,
    onMutate: async (variables) => {
      const { id: concertId } = variables
      await queryClient.cancelQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.detail(concertId),
      })
      await queryClient.setQueryData(apiClient.queryKeys.subscribe.concert.detail(concertId), null)

      await queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.list.paginated,
      })
      const prevPaginatedData = queryClient.getQueryData<SubscribedConcertPaginatedData>(
        apiClient.queryKeys.subscribe.concert.list.paginated,
      )
      const newPaginatedData: SubscribedConcertPaginatedData = {
        pageParams: prevPaginatedData?.pageParams ?? [0],
        pages: (prevPaginatedData?.pages.flat() ?? []).filter((v) => v?.id !== concertId),
      }
      await queryClient.setQueryData(apiClient.queryKeys.subscribe.concert.list.paginated, newPaginatedData)
      await queryClient.setQueryData<SubscribedConcertPaginatedData>(
        apiClient.queryKeys.subscribe.concert.list.paginated,
        newPaginatedData,
      )

      return null
    },
    onSettled: (data, variables, context) => {
      if (!data) {
        return
      }
      const { id: concertId } = data
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.detail(concertId),
      })
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.list.paginated,
      })
    },
  })

  const subscribeConcert = useCallback(
    ({ isSubscribed, concertId }: { isSubscribed: boolean; concertId: string }) => {
      if (isSubscribed) {
        mutateUnsubscribeConcert({
          id: concertId,
        })
      } else {
        mutateSubscribeConcert({
          id: concertId,
        })
      }
    },
    [mutateSubscribeConcert, mutateUnsubscribeConcert],
  )

  return subscribeConcert
}
