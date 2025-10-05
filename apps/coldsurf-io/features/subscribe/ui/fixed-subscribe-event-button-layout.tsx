'use client';

import { withStopPropagation } from '@/shared/lib';
import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

const Container = styled(motion.div)<{ $right: number; $bottom: number }>`
    position: absolute;
    bottom: ${(props) => `${props.$bottom}px`};
    right: ${(props) => `${props.$right}px`};
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
    background: ${semantics.color.background[4]};
    border-radius: 50%;

    box-shadow: 0 1px 3px ${semantics.color.border[1]}, 0 1px 2px ${semantics.color.border[2]};
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

export const FixedSubscribeEventButtonLayout = ({
  children,
  customRight = 12,
  customBottom = 12,
}: PropsWithChildren<{
  customRight?: number;
  customBottom?: number;
}>) => {
  return (
    <Container
      onClick={withStopPropagation()}
      whileHover={{
        scale: 1.1,
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      $right={customRight}
      $bottom={customBottom}
    >
      {children}
    </Container>
  );
};
