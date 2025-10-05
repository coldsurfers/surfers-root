import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0px 2rem;
  margin-bottom: 2rem;

  ${media.medium(css`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  `)}
`;
