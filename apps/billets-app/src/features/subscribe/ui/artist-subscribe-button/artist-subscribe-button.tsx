import { $api } from '@/lib/api/openapi-client'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useSubscribeArtistQuery } from '@/lib/react-query'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import { Button } from '@coldsurfers/ocean-road/native'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { ArtistSubscribeButtonProps } from './artist-subscribe-button.types'

export const ArtistSubscribeButton = ({ artistId, onShouldLogin, style, size = 'md' }: ArtistSubscribeButtonProps) => {
  const queryClient = useQueryClient()
  const { data: meData } = useGetMeQuery()
  const { data: subscribeArtistData } = useSubscribeArtistQuery({ artistId })
  const { mutate: subscribeArtist } = $api.useMutation('post', '/v1/subscribe/artist/{id}', {
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      const { id: artistId } = variables.params.path
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.artists.subscribed({
          artistId,
        }).queryKey,
      })
      const newSubscribeArtist: Awaited<ReturnType<typeof useSubscribeArtistQuery>>['data'] = {
        artistId,
        userId: meData.id,
      }
      queryClient.setQueryData(
        v1QueryKeyFactory.artists.subscribed({
          artistId,
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
  const { mutate: unsubscribeArtist } = $api.useMutation('delete', '/v1/subscribe/artist/{id}', {
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      const { id: artistId } = variables.params.path
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.artists.subscribed({
          artistId,
        }).queryKey,
      })
      queryClient.setQueryData(
        v1QueryKeyFactory.artists.subscribed({
          artistId,
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
      unsubscribeArtist({
        body: {
          type: 'unsubscribe-artist',
        },
        params: {
          path: {
            id: artistId,
          },
        },
      })
    } else {
      subscribeArtist({
        body: {
          type: 'subscribe-artist',
        },
        params: {
          path: {
            id: artistId,
          },
        },
      })
    }
  }, [artistId, subscribeArtist, subscribeArtistData, unsubscribeArtist])

  return (
    <Button size={size} theme="border" onPress={onPress} style={style}>
      {subscribeArtistData ? 'Following' : 'Follow'}
    </Button>
  )
}
