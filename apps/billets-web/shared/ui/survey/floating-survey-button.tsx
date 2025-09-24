'use client';

import { media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Container = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: ${semantics.color.background[4]};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    background-image: url('/logo.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    position: fixed;
    bottom: 1rem;
    right: 1rem;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    ${media.medium(css`
        width: 3.5rem;
        height: 3.5rem;
        bottom: 0.5rem;
        right: 0.5rem;
    `)}

    ${media.small(css`
        width: 3rem;
        height: 3rem;
        bottom: 0.5rem;
        right: 0.5rem;
    `)}
`;

const ContainerComponent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (_, ref) => <Container ref={ref} />
);

const MotionContent = motion.create(ContainerComponent);

type Props = {
  onClick?: () => void;
};

export const FloatingSurveyButton = ({ onClick }: Props) => {
  return (
    <MotionContent
      whileHover={{
        scale: 1.1,
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }}
      whileFocus={{
        scale: 1.1,
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }}
      whileTap={{
        scale: 1.1,
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
      }}
      onClick={onClick}
    />
  );
};
