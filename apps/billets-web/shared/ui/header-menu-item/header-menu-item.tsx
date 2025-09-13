'use client';

import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledMenuText = styled(Text)`
  color: ${semantics.color.foreground[3]};
`;

export const StyledMenuItem = styled.div`
  padding: 11px 16px;
  border-radius: 8px;

  &:hover {
    background-color: ${semantics.color.background[4]};
  }
`;

export const AppHeaderMenuTextSkeleton = styled.div`
  width: 80px;
  height: 36px;
  border-radius: 4px;
  background-color: ${semantics.color.background[4]};

  margin-right: 0.75rem;

  ${media.medium(css`
    width: 120px;
    height: 24px;
  `)}
`;

export const HeaderMenuItem = ({ title, isLoading }: { title: string; isLoading?: boolean }) => {
  if (isLoading) {
    return <AppHeaderMenuTextSkeleton />;
  }
  return (
    <StyledMenuItem>
      <StyledMenuText as="span">{title}</StyledMenuText>
    </StyledMenuItem>
  );
};
