import { $api } from '@/lib/api/openapi-client'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import useSubscribedConcertListQuery from '@/lib/react-query/queries/useSubscribedConcertListQuery'
import useSubscribedConcertQuery from '@/lib/react-query/queries/useSubscribedConcertQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useToggleSubscribeConcert = () => {
  const queryClient = useQueryClient()
  const { data: meData } = useGetMeQuery()

  const { mutate: mutateSubscribeConcert } = $api.useMutation('post', '/v1/subscribe/concert/{id}', {
    onMutate: async (variables) => {
      const { id: concertId } = variables.params.path
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId,
        }).queryKey,
      })
      if (!meData) {
        return
      }
      const previousSubscribedConcertList = queryClient.getQueryData<
        Awaited<ReturnType<typeof useSubscribedConcertListQuery>>['data']
      >(v1QueryKeyFactory.concerts.subscribedList.queryKey)
      const newSubscribedConcert: Awaited<ReturnType<typeof useSubscribedConcertQuery>['data']> = {
        concertId,
        userId: meData.id,
      }

      queryClient.setQueryData(v1QueryKeyFactory.concerts.subscribed({ concertId }).queryKey, newSubscribedConcert)
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
  const { mutate: mutateUnsubscribeConcert } = $api.useMutation('delete', '/v1/subscribe/concert/{id}', {
    onMutate: async (variables) => {
      const { id: concertId } = variables.params.path
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.concerts.subscribed({
          concertId,
        }).queryKey,
      })
      const previousSubscribedConcertList = queryClient.getQueryData<
        Awaited<ReturnType<typeof useSubscribedConcertListQuery>>['data']
      >(v1QueryKeyFactory.concerts.subscribedList.queryKey)
      queryClient.setQueryData(
        v1QueryKeyFactory.concerts.subscribed({
          concertId,
        }).queryKey,
        null,
      )
      queryClient.setQueryData(v1QueryKeyFactory.concerts.subscribedList.queryKey, {
        ...previousSubscribedConcertList,
        pageParams: previousSubscribedConcertList?.pageParams ?? 0,
        pages: (previousSubscribedConcertList?.pages.flat() ?? []).filter((v) => v?.concertId !== concertId),
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
        mutateUnsubscribeConcert({
          body: { id: concertId },
          params: {
            path: { id: concertId },
          },
        })
      } else {
        mutateSubscribeConcert({
          body: { id: concertId },
          params: {
            path: { id: concertId },
          },
        })
      }
    },
    [mutateSubscribeConcert, mutateUnsubscribeConcert],
  )

  return subscribeConcert
}
