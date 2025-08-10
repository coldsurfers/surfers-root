import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledTopTitleContainer = styled.div`
  min-height: auto;
  margin-top: 136px;
  padding-top: 128px;
  padding-bottom: 128px;
  display: flex;
  justify-content: center;

  ${media.medium(css`
    margin-top: 87px;
    padding-top: 64px;
    padding-bottom: 64px;
  `)}
`;

export const StyledTopTitleInner = styled.div`
  max-width: 1728px;

  padding-left: 128px;
  padding-right: 128px;

  ${media.large(css`
    max-width: 1536px;
  `)}

  ${media.medium(css`
    max-width: none;
    min-height: auto;

    padding-left: 48px;
    padding-right: 48px;
  `)}
`;

export const StyledTopTitle = styled(Text)`
  font-size: clamp(32px, 8.5vmin, 88px);
  font-weight: 820;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-align: center;
`;

export const StyledSmallTopTitleContainer = styled.div`
  margin-top: 24px;
  padding-left: 32px;
  padding-right: 32px;

  display: flex;
  justify-content: center;
`;

export const StyledSmallTopTitle = styled(Text)`
  font-weight: 418;
  letter-spacing: 0.01em;
  line-height: 1.5;
  text-align: center;
  font-size: 16px;
  color: ${semantics.color.foreground[3]};

  ${media.medium(css`
    font-size: 14px;
  `)}
`;
