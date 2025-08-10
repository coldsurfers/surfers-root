import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledLandingSection = styled.section<{ $withoutInitialPaddingTop?: boolean }>`
  padding-top: ${({ $withoutInitialPaddingTop }) => ($withoutInitialPaddingTop ? '0' : '180px')};
  width: 100%;
  min-height: 100vh;

  @media only screen and (orientation: portrait) {
    min-height: auto;
  }

  display: flex;
  justify-content: center;

  ${media['xx-large'](css`
    padding-top: 48px;
  `)}

  ${media['x-large'](css`
    padding-top: 82px;
  `)}

  ${media.large(css`
    padding-top: 120px;
  `)}
`;

export const StyledLandingSectionInnerContainer = styled.section<{ $reversed?: boolean }>`
  max-width: 1728px;
  width: 100%;
  z-index: 2;

  display: flex;
  flex-direction: ${(props) => (props.$reversed ? 'row-reverse' : 'row')};
  align-items: center;

  gap: 1rem;

  ${media.large(css`
    max-width: 1536px;
    flex-direction: column;
    gap: 4rem;
  `)}

  ${media.medium(css`
    max-width: none;
    width: 100%;
  `)}
`;
