'use client';

import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { forwardRef, useEffect, useRef } from 'react';

const Container = styled.div`
  width: 430px;
  height: 600px;
  background-color: ${semantics.color.background[4]};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-bottom: 1rem;
`;

const ContainerComponent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (_, ref) => <Container ref={ref} />
);

const MotionContainer = motion.create(ContainerComponent);

export const SurveyForm = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <MotionContainer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    />
  );
});
