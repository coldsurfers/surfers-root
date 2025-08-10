import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledLandingImageContainer = styled.div`
  width: 50%;

  ${media.large(css`
    width: 100%;
  `)}
`;
