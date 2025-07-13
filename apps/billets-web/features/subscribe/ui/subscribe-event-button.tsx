'use client';

import { apiClient } from '@/libs/openapi-client';
import { useIsLoggedIn, withStopPropagation } from '@/shared/lib';
import { useLoginModalStore } from '@/shared/store';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
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
  const { isLoggedIn } = useIsLoggedIn();
  const openLoginModal = useLoginModalStore((state) => state.open);
  const { mutate: subscribeEvent } = useMutation({
    mutationFn: () =>
      apiClient.subscribe.subscribeEvent({
        eventId,
      }),
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const onClick = useCallback(() => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    subscribeEvent();
  }, [subscribeEvent, isLoggedIn, openLoginModal]);

  return (
    <Container onClick={withStopPropagation(onClick)}>
      <Heart size={24} color={semantics.color.foreground[4]} />
    </Container>
  );
};
