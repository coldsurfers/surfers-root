import { apiClient } from '@/lib/api/openapi-client'
import { components } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

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
        // @todo: needs enhance
        id: concertId,
        date: new Date().toISOString(),
        title: '',
      } satisfies components['schemas']['ConcertDTOSchema']
      await queryClient.setQueryData(apiClient.queryKeys.subscribe.concert.detail(concertId), newSubscribedConcert)
      return newSubscribedConcert
      // const previousSubscribedConcertList = queryClient.getQueryData<
      //   Awaited<ReturnType<typeof useSubscribedConcertListQuery>>['data']
    },
    // onMutate: async (variables) => {
    //   const { id: concertId } = variables
    //   await queryClient.cancelQueries({
    //     queryKey: apiClient.queryKeys.subscribe.concert.detail(concertId),
    //   })
    //   if (!meData) {
    //     return
    //   }
    //   const previousSubscribedConcertList = queryClient.getQueryData<components['schemas']['ConcertDTOSchema'][]>(
    //     apiClient.queryKeys.subscribe.concert.listAll,
    //   )
    //   const newSubscribedConcert: components['schemas']['ConcertDTOSchema'] = {
    //     id: concertId,
    //     'title':
    //   }

    //   queryClient.setQueryData(apiClient.queryKeys.subscribe.concert.detail(concertId), newSubscribedConcert)
    //   queryClient.setQueryData(v1QueryKeyFactory.concerts.subscribedList.queryKey, {
    //     ...previousSubscribedConcertList,
    //     pageParams: previousSubscribedConcertList?.pageParams ?? 0,
    //     pages: [newSubscribedConcert, ...(previousSubscribedConcertList?.pages.flat() ?? [])],
    //   })
    //   return newSubscribedConcert
    // },
    onSettled: (data, variables, context) => {
      if (!data) {
        return
      }
      const { id: concertId } = data
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.detail(concertId),
      })
      // queryClient.invalidateQueries({
      //   queryKey: v1QueryKeyFactory.concerts.subscribed({
      //     concertId: data.concertId,
      //   }).queryKey,
      // })
      // queryClient.invalidateQueries({
      //   queryKey: v1QueryKeyFactory.concerts.subscribedList.queryKey,
      // })
    },
  })
  const { mutate: mutateUnsubscribeConcert } = useMutation({
    mutationFn: apiClient.subscribe.unsubscribeConcert,
    onMutate: async (variables) => {
      const { id: concertId } = variables
      await queryClient.cancelQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.detail(concertId),
        // queryKey: v1QueryKeyFactory.concerts.subscribed({
        //   concertId,
        // }).queryKey,
      })
      await queryClient.setQueryData(apiClient.queryKeys.subscribe.concert.detail(concertId), null)
      // const previousSubscribedConcertList = queryClient.getQueryData<
      //   Awaited<ReturnType<typeof useSubscribedConcertListQuery>>['data']
      // >(v1QueryKeyFactory.concerts.subscribedList.queryKey)
      // queryClient.setQueryData(
      //   v1QueryKeyFactory.concerts.subscribed({
      //     concertId,
      //   }).queryKey,
      //   null,
      // )
      // queryClient.setQueryData(v1QueryKeyFactory.concerts.subscribedList.queryKey, {
      //   ...previousSubscribedConcertList,
      //   pageParams: previousSubscribedConcertList?.pageParams ?? 0,
      //   pages: (previousSubscribedConcertList?.pages.flat() ?? []).filter((v) => v?.concertId !== concertId),
      // })
      return null
    },
    onSettled: (data, variables, context) => {
      if (!data) {
        return
      }
      const { id: concertId } = data
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.concert.detail(concertId),
        // queryKey: v1QueryKeyFactory.concerts.subscribed({
        //   concertId: data.concertId,
        // }).queryKey,
      })
      // queryClient.invalidateQueries({
      //   queryKey: v1QueryKeyFactory.concerts.subscribedList.queryKey,
      // })
    },
  })

  const subscribeConcert = useCallback(
    ({ isSubscribed, concertId }: { isSubscribed: boolean; concertId: string }) => {
      if (isSubscribed) {
        mutateUnsubscribeConcert({
          id: concertId,
          // body: { id: concertId },
          // params: {
          //   path: { id: concertId },
          // },
        })
      } else {
        mutateSubscribeConcert({
          id: concertId,
          // body: { id: concertId },
          // params: {
          //   path: { id: concertId },
          // },
        })
      }
    },
    [mutateSubscribeConcert, mutateUnsubscribeConcert],
  )

  return subscribeConcert
}
