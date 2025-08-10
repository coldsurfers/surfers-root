import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledLandingYoutubeContainer = styled.div`
  width: 50%;

  padding-right: 5vw;

  ${media.large(css`
    width: 100%;
    padding-right: 0;
  `)}
`;
