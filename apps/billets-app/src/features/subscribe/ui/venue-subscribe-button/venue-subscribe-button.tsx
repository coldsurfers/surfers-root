import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import { useSubscribeVenueMutation, useSubscribeVenueQuery, useUnsubscribeVenueMutation } from '@/lib/react-query'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import { Button } from '@coldsurfers/ocean-road/native'
import { useQueryClient } from '@tanstack/react-query'
import { VenueSubscribeButtonProps } from './venue-subscribe-button.types'

export const VenueSubscribeButton = ({ venueId, onShouldLogin, style }: VenueSubscribeButtonProps) => {
  const queryClient = useQueryClient()
  const { data: meData } = useGetMeQuery()
  const { data: subscribeVenueData } = useSubscribeVenueQuery({ venueId })
  const { mutate: subscribeVenue } = useSubscribeVenueMutation({
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.venues.subscribed({
          venueId: variables.venueId,
        }).queryKey,
      })

      const newSubscribeVenue: Awaited<ReturnType<typeof useSubscribeVenueQuery>>['data'] = {
        userId: meData.id,
        venueId: variables.venueId,
      }

      queryClient.setQueryData(
        v1QueryKeyFactory.venues.subscribed({
          venueId: variables.venueId,
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
  const { mutate: unsubscribeVenue } = useUnsubscribeVenueMutation({
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      await queryClient.cancelQueries({
        queryKey: v1QueryKeyFactory.venues.subscribed({
          venueId: variables.venueId,
        }).queryKey,
      })

      queryClient.setQueryData(
        v1QueryKeyFactory.venues.subscribed({
          venueId: variables.venueId,
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
      size="sm"
      theme="border"
      onPress={() => {
        if (subscribeVenueData) {
          unsubscribeVenue({
            venueId,
          })
        } else {
          subscribeVenue({
            venueId,
          })
        }
      }}
      style={style}
    >
      {subscribeVenueData ? 'Following' : 'Follow'}
    </Button>
  )
}
