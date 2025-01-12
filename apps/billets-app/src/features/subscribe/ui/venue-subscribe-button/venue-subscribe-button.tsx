import { apiClient } from '@/lib/api/openapi-client'
import { OpenApiError } from '@/lib/errors'
import { components } from '@/types/api'
import { Button } from '@coldsurfers/ocean-road/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { VenueSubscribeButtonProps } from './venue-subscribe-button.types'

export const VenueSubscribeButton = ({ venueId, onShouldLogin, style, size = 'md' }: VenueSubscribeButtonProps) => {
  const queryClient = useQueryClient()
  const { data: meData } = useQuery({
    queryKey: apiClient.queryKeys.user.me,
    queryFn: () => apiClient.user.getMe(),
  })
  const { data: subscribeVenueData } = useQuery({
    queryKey: apiClient.queryKeys.subscribe.venue.detail(venueId),
    queryFn: () => apiClient.subscribe.getSubscribedVenue(venueId),
  })
  const { mutate: subscribeVenue } = useMutation<
    Awaited<ReturnType<typeof apiClient.subscribe.subscribeVenue>>,
    OpenApiError,
    {
      id: string
    }
  >({
    mutationFn: (variables) => apiClient.subscribe.subscribeVenue({ id: variables.id }),
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      const { id: venueId } = variables
      await queryClient.cancelQueries({
        queryKey: apiClient.queryKeys.subscribe.venue.detail(venueId),
      })

      const newSubscribeVenue: components['schemas']['VenueDTOSchema'] = {
        id: venueId,
        address: '',
        lat: 0,
        lng: 0,
        name: '',
      }

      queryClient.setQueryData(apiClient.queryKeys.subscribe.venue.detail(venueId), newSubscribeVenue)

      return newSubscribeVenue
    },
    onSettled: (data) => {
      if (!data) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.venue.detail(data.id),
      })
    },
  })
  const { mutate: unsubscribeVenue } = useMutation<
    Awaited<ReturnType<typeof apiClient.subscribe.unsubscribeVenue>>,
    OpenApiError,
    {
      id: string
    }
  >({
    mutationFn: (variables) => apiClient.subscribe.unsubscribeVenue({ id: variables.id }),
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin()
        return
      }
      const { id: venueId } = variables
      await queryClient.cancelQueries({
        queryKey: apiClient.queryKeys.subscribe.venue.detail(venueId),
      })

      queryClient.setQueryData(apiClient.queryKeys.subscribe.venue.detail(venueId), null)

      return null
    },
    onSettled: (data) => {
      console.log(data)
      if (!data) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.queryKeys.subscribe.venue.detail(data.id),
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
            id: venueId,
          })
        } else {
          subscribeVenue({
            id: venueId,
          })
        }
      }}
      style={style}
    >
      {subscribeVenueData ? 'Following' : 'Follow'}
    </Button>
  )
}
