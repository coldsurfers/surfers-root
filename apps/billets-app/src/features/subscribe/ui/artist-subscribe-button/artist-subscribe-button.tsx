import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useSubscribeArtistMutation, useSubscribeArtistQuery, useUnsubscribeArtistMutation } from '@/lib/react-query'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import { Button } from '@coldsurfers/ocean-road/native'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { ArtistSubscribeButtonProps } from './artist-subscribe-button.types'

export const ArtistSubscribeButton = ({ artistId, onShouldLogin, style, size = 'md' }: ArtistSubscribeButtonProps) => {
  const queryClient = useQueryClient()
  const { data: meData } = useGetMeQuery()
  const { data: subscribeArtistData } = useSubscribeArtistQuery({ artistId })
  const { mutate: subscribeArtist } = useSubscribeArtistMutation({
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.artists.subscribed({
          artistId: variables.artistId,
        }).queryKey,
      })
      const newSubscribeArtist: Awaited<ReturnType<typeof useSubscribeArtistQuery>>['data'] = {
        artistId: variables.artistId,
        userId: meData.id,
      }
      queryClient.setQueryData(
        v1QueryKeyFactory.artists.subscribed({
          artistId: variables.artistId,
        }).queryKey,
        newSubscribeArtist,
      )

      return newSubscribeArtist
    },
    onSettled(data) {
      if (!data) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.artists.subscribed({
          artistId: data.artistId,
        }).queryKey,
      })
    },
  })
  const { mutate: unsubscribeArtist } = useUnsubscribeArtistMutation({
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.artists.subscribed({
          artistId: variables.artistId,
        }).queryKey,
      })
      queryClient.setQueryData(
        v1QueryKeyFactory.artists.subscribed({
          artistId: variables.artistId,
        }).queryKey,
        null,
      )

      return null
    },
    onSettled(data) {
      if (!data) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.artists.subscribed({
          artistId: data.artistId,
        }).queryKey,
      })
    },
  })

  const onPress = useCallback(() => {
    const isSubscribed = !!subscribeArtistData
    if (isSubscribed) {
      unsubscribeArtist({ artistId })
    } else {
      subscribeArtist({ artistId })
    }
  }, [artistId, subscribeArtist, subscribeArtistData, unsubscribeArtist])

  return (
    <Button size={size} theme="border" onPress={onPress} style={style}>
      {subscribeArtistData ? 'Following' : 'Follow'}
    </Button>
  )
}
