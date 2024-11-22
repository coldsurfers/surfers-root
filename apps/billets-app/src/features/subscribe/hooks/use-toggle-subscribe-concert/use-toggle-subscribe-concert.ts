import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import useSubscribeConcertMutation from '@/lib/react-query/mutations/useSubscribeConcertMutation'
import useUnsubscribeConcertMutation from '@/lib/react-query/mutations/useUnsubscribeConcertMutation'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import useSubscribedConcertListQuery from '@/lib/react-query/queries/useSubscribedConcertListQuery'
import useSubscribedConcertQuery from '@/lib/react-query/queries/useSubscribedConcertQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useToggleSubscribeConcert = () => {
  const queryClient = useQueryClient()
  const { data: meData } = useGetMeQuery()

  const { mutate: mutateSubscribeConcert } = useSubscribeConcertMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId: variables.id,
        }).queryKey,
      })
      if (!meData) {
        return
      }
      const previousSubscribedConcertList = queryClient.getQueryData<
        Awaited<ReturnType<typeof useSubscribedConcertListQuery>>['data']
      >(v1QueryKeyFactory.concerts.subscribedList.queryKey)
      const newSubscribedConcert: Awaited<ReturnType<typeof useSubscribedConcertQuery>['data']> = {
        concertId: variables.id,
        userId: meData.id,
      }

      queryClient.setQueryData(
        v1QueryKeyFactory.concerts.subscribed({ concertId: variables.id }).queryKey,
        newSubscribedConcert,
      )
      queryClient.setQueryData(v1QueryKeyFactory.concerts.subscribedList.queryKey, {
        ...previousSubscribedConcertList,
        pageParams: previousSubscribedConcertList?.pageParams ?? 0,
        pages: [newSubscribedConcert, ...(previousSubscribedConcertList?.pages.flat() ?? [])],
      })
      return newSubscribedConcert
    },
    onSettled: (data) => {
      if (!data?.concertId) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId: data.concertId,
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribedList.queryKey,
      })
    },
  })
  const { mutate: mutateUnsubscribeConcert } = useUnsubscribeConcertMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId: variables.id,
        }).queryKey,
      })
      const previousSubscribedConcertList = queryClient.getQueryData<
        Awaited<ReturnType<typeof useSubscribedConcertListQuery>>['data']
      >(v1QueryKeyFactory.concerts.subscribedList.queryKey)
      queryClient.setQueryData(
        v1QueryKeyFactory.concerts.subscribed({
          concertId: variables.id,
        }).queryKey,
        null,
      )
      queryClient.setQueryData(v1QueryKeyFactory.concerts.subscribedList.queryKey, {
        ...previousSubscribedConcertList,
        pageParams: previousSubscribedConcertList?.pageParams ?? 0,
        pages: (previousSubscribedConcertList?.pages.flat() ?? []).filter((v) => v?.concertId !== variables.id),
      })
      return null
    },
    onSettled: (data) => {
      if (!data?.concertId) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId: data.concertId,
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribedList.queryKey,
      })
    },
  })

  const subscribeConcert = useCallback(
    ({ isSubscribed, concertId }: { isSubscribed: boolean; concertId: string }) => {
      if (isSubscribed) {
        mutateUnsubscribeConcert({ id: concertId })
      } else {
        mutateSubscribeConcert({ id: concertId })
      }
    },
    [mutateSubscribeConcert, mutateUnsubscribeConcert],
  )

  return subscribeConcert
}
