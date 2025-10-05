'use client';

import type { PropsWithChildren } from 'react';
import { StyledMotionDiv } from './page-top.styled';

export const PageTopSlideUpMotion = ({ children }: PropsWithChildren) => {
  return (
    <StyledMotionDiv
      initial={{ opacity: 0, transform: 'translateY(50%)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      transition={{ duration: 1.0 }}
    >
      {children}
    </StyledMotionDiv>
  );
};

export const PageTopFadeInMotion = ({ children }: PropsWithChildren) => {
  return (
    <StyledMotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      {children}
    </StyledMotionDiv>
  );
};
