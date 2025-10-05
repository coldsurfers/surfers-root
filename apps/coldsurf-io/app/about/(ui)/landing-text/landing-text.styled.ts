import { Text, media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledLandingTextContainer = styled.div`
  width: 55%;
  ${media.large(css`
    width: 100%;
  `)}
`;

export const StyledLandingText = styled(Text)`
  font-size: clamp(32px, 8.5vmin, 88px);
  font-weight: 820;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-align: left;
`;

export const StyledSmallLandingText = styled(Text)`
  font-size: clamp(16px, 2vmin, 20px);
  font-weight: 418;
  letter-spacing: -0.02em;
  line-height: 1.5;
`;
