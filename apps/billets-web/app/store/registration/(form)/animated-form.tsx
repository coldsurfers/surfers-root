'use client';

import { Text } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { FormEventHandler, PropsWithChildren } from 'react';

const MotionAnimatedForm = motion.form;
const StyledAnimatedForm = styled(MotionAnimatedForm)`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  max-width: 430px;
`;
const StyledFormTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

export const AnimatedForm = ({
  children,
  title,
  onSubmit,
}: PropsWithChildren<{
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}>) => {
  return (
    <StyledAnimatedForm
      initial={{ opacity: 0, translateX: '-10%' }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: '-10%' }}
      transition={{ duration: 0.125, type: 'spring', stiffness: 100 }}
      onSubmit={onSubmit}
    >
      <StyledFormTitle>{title}</StyledFormTitle>
      {children}
    </StyledAnimatedForm>
  );
};
