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
  height: 32px;
  border-radius: 4px;
  background-color: ${semantics.color.background[4]};

  ${media.medium(css`
    width: 120px;
    height: 24px;
  `)}
`;

export const HeaderMenuItem = (props: { title: string; isLoading?: boolean }) => {
  return (
    <StyledMenuItem>
      <StyledMenuText as="span">
        {props.isLoading ? <AppHeaderMenuTextSkeleton /> : props.title}
      </StyledMenuText>
    </StyledMenuItem>
  );
};
