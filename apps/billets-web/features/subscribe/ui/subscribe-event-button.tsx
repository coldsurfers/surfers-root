'use client';

import { apiClient } from '@/libs/openapi-client';
import { useIsLoggedIn, withStopPropagation } from '@/shared/lib';
import { useLoginModalStore } from '@/shared/store';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useCallback } from 'react';

const Container = styled.div`
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

type Props = {
  eventId: string;
};

export const SubscribeEventButton = ({ eventId }: Props) => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useIsLoggedIn();
  const openLoginModal = useLoginModalStore((state) => state.open);
  const { data: subscribedEvent } = useQuery({
    queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId }),
    queryFn: () =>
      apiClient.subscribe.getEvent({
        eventId,
      }),
  });
  const isSubscribed = !!subscribedEvent;
  const { mutate: subscribeEvent } = useMutation({
    mutationFn: () =>
      apiClient.subscribe.subscribeEvent({
        eventId,
      }),
    onMutate: () => {
      queryClient.setQueryData<
        Awaited<ReturnType<typeof apiClient.subscribe.getEvent>> | undefined
      >(apiClient.subscribe.queryKeys.eventSubscribe({ eventId }), () => {
        const newData: Awaited<ReturnType<typeof apiClient.subscribe.getEvent>> = {
          eventId,
          subscribedAt: new Date().toISOString(),
          thumbUrl: undefined,
          userId: '',
        };
        return newData;
      });
    },
    onSettled: (data) => {
      if (!data) {
        queryClient.removeQueries({
          queryKey: apiClient.subscribe.queryKeys.eventSubscribe({
            eventId,
          }),
        });
        return;
      }
      queryClient.invalidateQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({
          eventId,
        }),
      });
    },
  });

  const { mutate: unsubscribeEvent } = useMutation({
    mutationFn: () => apiClient.subscribe.unsubscribeEvent({ eventId }),
    onSettled: () => {
      queryClient.removeQueries({
        queryKey: apiClient.subscribe.queryKeys.eventSubscribe({
          eventId,
        }),
      });
    },
  });

  const onClick = useCallback(() => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    if (isSubscribed) {
      unsubscribeEvent();
      return;
    }
    subscribeEvent();
  }, [subscribeEvent, isLoggedIn, openLoginModal, isSubscribed, unsubscribeEvent]);

  return (
    <Container onClick={withStopPropagation(onClick)}>
      <Heart
        size={24}
        color={semantics.color.foreground[4]}
        fill={isSubscribed ? semantics.color.foreground[4] : 'transparent'}
      />
    </Container>
  );
};
