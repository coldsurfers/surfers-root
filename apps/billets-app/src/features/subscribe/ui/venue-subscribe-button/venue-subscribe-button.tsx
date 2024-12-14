import { $api } from '@/lib/api/openapi-client'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useSubscribeVenueQuery } from '@/lib/react-query'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import { Button } from '@coldsurfers/ocean-road/native'
import { useQueryClient } from '@tanstack/react-query'
import { VenueSubscribeButtonProps } from './venue-subscribe-button.types'

export const VenueSubscribeButton = ({ venueId, onShouldLogin, style, size = 'md' }: VenueSubscribeButtonProps) => {
  const queryClient = useQueryClient()
  const { data: meData } = useGetMeQuery()
  const { data: subscribeVenueData } = useSubscribeVenueQuery({ venueId })
  const { mutate: subscribeVenue } = $api.useMutation('post', '/v1/subscribe/venue/{id}', {
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      const { id: venueId } = variables.params.path
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.venues.subscribed({
          venueId,
        }).queryKey,
      })

      const newSubscribeVenue: Awaited<ReturnType<typeof useSubscribeVenueQuery>>['data'] = {
        userId: meData.id,
        venueId,
      }

      queryClient.setQueryData(
        v1QueryKeyFactory.venues.subscribed({
          venueId,
        }).queryKey,
        newSubscribeVenue,
      )

      return newSubscribeVenue
    },
    onSettled: (data) => {
      if (!data) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.venues.subscribed({
          venueId: data.venueId,
        }).queryKey,
      })
    },
  })
  const { mutate: unsubscribeVenue } = $api.useMutation('delete', '/v1/subscribe/venue/{id}', {
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      const { id: venueId } = variables.params.path
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.venues.subscribed({
          venueId,
        }).queryKey,
      })

      queryClient.setQueryData(
        v1QueryKeyFactory.venues.subscribed({
          venueId,
        }).queryKey,
        null,
      )

      return null
    },
    onSettled: (data) => {
      console.log(data)
      if (!data) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: v1QueryKeyFactory.venues.subscribed({
          venueId: data.venueId,
        }).queryKey,
      })
    },
  })
  return (
    <Button
      size={size}
      theme="border"
      onPress={() => {
        if (subscribeVenueData) {
          unsubscribeVenue({
            body: {
              type: 'unsubscribe-venue',
            },
            params: {
              path: {
                id: venueId,
              },
            },
          })
        } else {
          subscribeVenue({
            body: {
              type: 'subscribe-venue',
            },
            params: {
              path: {
                id: venueId,
              },
            },
          })
        }
      }}
      style={style}
    >
      {subscribeVenueData ? 'Following' : 'Follow'}
    </Button>
  )
}
