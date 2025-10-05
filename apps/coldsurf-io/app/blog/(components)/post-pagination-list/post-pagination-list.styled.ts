import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledPostListContainer = styled.div`
  margin-top: 6.5rem;

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`;
