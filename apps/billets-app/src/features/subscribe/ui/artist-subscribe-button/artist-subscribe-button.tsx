import { apiClient } from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/errors'
import { components } from '@/types/api'
import { Button } from '@coldsurfers/ocean-road/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { ArtistSubscribeButtonProps } from './artist-subscribe-button.types'

export const ArtistSubscribeButton = ({ artistId, onShouldLogin, style, size = 'md' }: ArtistSubscribeButtonProps) => {
  const queryClient = useQueryClient()
  const { data: meData } = useQuery({
    queryKey: apiClient.queryKeys.user.me,
    queryFn: () => apiClient.user.getMe(),
  })
  const { data: subscribeArtistData } = useQuery({
    queryKey: apiClient.queryKeys.subscribe.artist.detail(artistId),
    queryFn: () => apiClient.subscribe.getSubscribedArtist(artistId),
  })
  const { mutate: subscribeArtist } = useMutation<
    Awaited<ReturnType<typeof apiClient.subscribe.subscribeArtist>>,
    OpenApiError,
    {
      id: string
    }
  >({
    mutationFn: (variables) => apiClient.subscribe.subscribeArtist({ id: variables.id }),
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      const { id: artistId } = variables
      await queryClient.cancelQueries({
        queryKey: apiClient.queryKeys.subscribe.artist.detail(artistId),
      })
      const newSubscribeArtist: components['schemas']['ArtistDTOSchema'] = {
        id: artistId,
        name: '',
        thumbUrl: '',
      }
      queryClient.setQueryData<components['schemas']['ArtistDTOSchema']>(
        apiClient.queryKeys.subscribe.artist.detail(artistId),
        newSubscribeArtist,
      )

      return newSubscribeArtist
    },
    onSettled(data) {
      if (!data) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.artist.detail(data.id),
      })
    },
  })
  const { mutate: unsubscribeArtist } = useMutation<
    Awaited<ReturnType<typeof apiClient.subscribe.unsubscribeArtist>>,
    OpenApiError,
    {
      id: string
    }
  >({
    mutationFn: (variables) => apiClient.subscribe.unsubscribeArtist({ id: variables.id }),
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      const { id: artistId } = variables
      await queryClient.cancelQueries({
        queryKey: apiClient.queryKeys.subscribe.artist.detail(artistId),
      })
      queryClient.setQueryData(apiClient.queryKeys.subscribe.artist.detail(artistId), null)

      return null
    },
    onSettled(data) {
      if (!data) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.artist.detail(data.id),
      })
    },
  })

  const onPress = useCallback(() => {
    const isSubscribed = !!subscribeArtistData
    if (isSubscribed) {
      unsubscribeArtist({
        id: artistId,
      })
    } else {
      subscribeArtist({
        id: artistId,
      })
    }
  }, [artistId, subscribeArtist, subscribeArtistData, unsubscribeArtist])

  return (
    <Button size={size} theme="border" onPress={onPress} style={style}>
      {subscribeArtistData ? 'Following' : 'Follow'}
    </Button>
  )
}
