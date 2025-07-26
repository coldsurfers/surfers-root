import { apiClient } from '@/lib/api/openapi-client';
import type { components } from '@/types/api';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { Button } from '@coldsurfers/ocean-road/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { VenueSubscribeButtonProps } from './venue-subscribe-button.types';

export const VenueSubscribeButton = ({
  venueId,
  onShouldLogin,
  style,
  size = 'md',
}: VenueSubscribeButtonProps) => {
  const queryClient = useQueryClient();
  const { data: meData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });
  const { data: subscribeVenueData } = useQuery({
    queryKey: apiClient.subscribe.queryKeys.venueSubscribe({ venueId }),
    queryFn: () => apiClient.subscribe.getVenue({ venueId }),
  });
  const { mutate: subscribeVenue } = useMutation<
    components['schemas']['VenueSubscribeDTOSchema'],
    OpenApiError,
    {
      venueId: string;
    }
  >({
    mutationFn: (variables) => apiClient.subscribe.subscribeVenue(variables),
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin();
        return;
      }
      const { venueId } = variables;
      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.venueSubscribe({ venueId }),
      });

      const newSubscribeVenue: components['schemas']['VenueSubscribeDTOSchema'] = {
        subscribedAt: new Date().toISOString(),
        userId: meData.id,
        venueId,
      };

      queryClient.setQueryData(
        apiClient.subscribe.queryKeys.venueSubscribe({ venueId }),
        newSubscribeVenue
      );

      return newSubscribeVenue;
    },
    onSettled: (data) => {
      if (!data) {
        return;
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.venueSubscribe({ venueId }),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.venueList({}),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.infoMe,
      });
    },
  });
  const { mutate: unsubscribeVenue } = useMutation<
    components['schemas']['VenueSubscribeDTOSchema'],
    OpenApiError,
    {
      venueId: string;
    }
  >({
    mutationFn: (variables) => apiClient.subscribe.unsubscribeVenue(variables),
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin();
        return;
      }
      const { venueId } = variables;
      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.venueSubscribe({ venueId }),
      });

      queryClient.setQueryData(apiClient.subscribe.queryKeys.venueSubscribe({ venueId }), null);

      return null;
    },
    onSettled: (data) => {
      console.log(data);
      if (!data) {
        return;
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.venueSubscribe({ venueId: data.venueId }),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.venueList({}),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.infoMe,
      });
    },
  });
  return (
    <Button
      size={size}
      theme="border"
      onPress={() => {
        if (subscribeVenueData) {
          unsubscribeVenue({
            venueId,
          });
        } else {
          subscribeVenue({
            venueId,
          });
        }
      }}
      style={style}
    >
      {subscribeVenueData ? 'Following' : 'Follow'}
    </Button>
  );
};
