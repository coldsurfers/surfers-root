'use client';

import { apiClient } from '@/libs/openapi-client';
import { withStopPropagation } from '@/shared/lib';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useIsLoggedIn } from 'app/(hooks)/use-is-logged-in';
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
      return;
    }
    subscribeEvent();
  }, [subscribeEvent, isLoggedIn]);

  return (
    <Container onClick={withStopPropagation(onClick)}>
      <Heart size={24} color={semantics.color.foreground[4]} />
    </Container>
  );
};
