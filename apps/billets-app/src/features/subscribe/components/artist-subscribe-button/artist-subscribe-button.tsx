import { apiClient } from '@/lib/api/openapi-client';
import type { components } from '@/types/api';
import type { OpenApiError } from '@coldsurfers/api-sdk';
import { Button } from '@coldsurfers/ocean-road/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { ArtistSubscribeButtonProps } from './artist-subscribe-button.types';

export const ArtistSubscribeButton = ({
  artistId,
  onShouldLogin,
  style,
  size = 'md',
}: ArtistSubscribeButtonProps) => {
  const queryClient = useQueryClient();
  const { data: meData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });
  const { data: subscribeArtistData } = useQuery({
    queryKey: apiClient.subscribe.queryKeys.artistSubscribe({ artistId }),
    queryFn: () => apiClient.subscribe.getArtist({ artistId }),
  });
  const { mutate: subscribeArtist } = useMutation<
    components['schemas']['ArtistSubscribeDTOSchema'],
    OpenApiError,
    {
      artistId: string;
    }
  >({
    mutationFn: (variables) =>
      apiClient.subscribe.subscribeArtist({ artistId: variables.artistId }),
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin();
        return;
      }
      const { artistId } = variables;
      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.artistSubscribe({ artistId }),
      });
      const newSubscribeArtist: components['schemas']['ArtistSubscribeDTOSchema'] = {
        artistId,
        subscribedAt: new Date().toISOString(),
        userId: '',
      };
      queryClient.setQueryData<components['schemas']['ArtistSubscribeDTOSchema']>(
        apiClient.subscribe.queryKeys.artistSubscribe({ artistId }),
        newSubscribeArtist
      );

      return newSubscribeArtist;
    },
    onSettled(data) {
      if (!data) {
        return;
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.artistSubscribe({ artistId }),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.artistList({}),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.infoMe,
      });
    },
  });
  const { mutate: unsubscribeArtist } = useMutation<
    components['schemas']['ArtistSubscribeDTOSchema'],
    OpenApiError,
    {
      artistId: string;
    }
  >({
    mutationFn: (variables) => apiClient.subscribe.unsubscribeArtist(variables),
    onMutate: async (variables) => {
      if (!meData) {
        onShouldLogin();
        return;
      }
      const { artistId } = variables;
      await queryClient.cancelQueries({
        queryKey: apiClient.subscribe.queryKeys.artistSubscribe({ artistId }),
      });
      queryClient.setQueryData(apiClient.subscribe.queryKeys.artistSubscribe({ artistId }), null);

      return null;
    },
    onSettled(data) {
      if (!data) {
        return;
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.artistSubscribe({ artistId }),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.artistList({}),
      });
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.infoMe,
      });
    },
  });

  const onPress = useCallback(() => {
    const isSubscribed = !!subscribeArtistData;
    if (isSubscribed) {
      unsubscribeArtist({
        artistId,
      });
    } else {
      subscribeArtist({
        artistId,
      });
    }
  }, [artistId, subscribeArtist, subscribeArtistData, unsubscribeArtist]);

  return (
    <Button size={size} theme="border" onPress={onPress} style={style}>
      {subscribeArtistData ? 'Following' : 'Follow'}
    </Button>
  );
};
