'use client';

import { Button } from '@coldsurfers/ocean-road';
import { memo } from 'react';
import { StyledErrorContainer, StyledErrorText } from './unknown-error.styled';

export const UnknownError = memo(({ onClickRetry }: { onClickRetry: () => void }) => {
  return (
    <StyledErrorContainer>
      <StyledErrorText as="h1">알 수 없는 오류가 발생했어요 🗯</StyledErrorText>
      <Button onClick={onClickRetry}>다시 시도하기</Button>
    </StyledErrorContainer>
  );
});
