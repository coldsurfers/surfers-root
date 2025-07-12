'use client';

import { withStopPropagation } from '@/shared/lib';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { Heart } from 'lucide-react';

const Container = styled.div`
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

export const SubscribeEventButton = () => {
  return (
    <Container onClick={withStopPropagation()}>
      <Heart size={24} color={semantics.color.foreground[4]} />
    </Container>
  );
};
