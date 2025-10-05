'use client';

import { Text } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { FormEventHandler, PropsWithChildren } from 'react';

const MotionAnimatedForm = motion.form;
const StyledAnimatedForm = styled(MotionAnimatedForm)<{
  $maxWidth?: number;
  $alignCenter?: boolean;
}>`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignCenter }) => ($alignCenter ? 'center' : 'unset')};
  max-width: ${({ $maxWidth }) => $maxWidth ?? 430}px;
`;
const StyledFormTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

export const AnimatedForm = ({
  children,
  title,
  onSubmit,
  maxWidth,
  alignCenter,
}: PropsWithChildren<{
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  maxWidth?: number;
  alignCenter?: boolean;
}>) => {
  return (
    <StyledAnimatedForm
      initial={{ opacity: 0, translateX: '-10%' }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: '-10%' }}
      transition={{ duration: 0.125, type: 'spring', stiffness: 100, delay: 0.125 }}
      onSubmit={onSubmit}
      $maxWidth={maxWidth}
      $alignCenter={alignCenter}
    >
      <StyledFormTitle>{title}</StyledFormTitle>
      {children}
    </StyledAnimatedForm>
  );
};
