'use client';

import { Text } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { FormEventHandler, PropsWithChildren } from 'react';

const MotionAnimatedForm = motion.form;
const StyledAnimatedForm = styled(MotionAnimatedForm)<{
  $alignCenter?: boolean;
}>`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignCenter }) => ($alignCenter ? 'center' : 'unset')};
`;
const StyledFormTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

export const AnimatedForm = ({
  children,
  title,
  onSubmit,
  alignCenter,
  delay,
}: PropsWithChildren<{
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  alignCenter?: boolean;
  delay?: number;
}>) => {
  return (
    <StyledAnimatedForm
      initial={{ opacity: 0, translateX: '-10%' }}
      animate={{
        opacity: 1,
        translateX: 0,
        transition: {
          delay: delay ?? 0,
        },
      }}
      exit={{ opacity: 0, transition: { delay: 0 } }}
      transition={{ duration: 0.125, type: 'spring', stiffness: 100 }}
      onSubmit={onSubmit}
      $alignCenter={alignCenter}
    >
      <StyledFormTitle>{title}</StyledFormTitle>
      {children}
    </StyledAnimatedForm>
  );
};
