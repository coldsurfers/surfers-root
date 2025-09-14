import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledTopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
`;

export const StyledTopInfoTitle = styled(Text)`
  font-weight: 600;
  margin: unset;
  font-size: 60px;

  ${media.medium(css`
    font-size: 38px;
  `)}
`;

export const StyledVenueTitle = styled(Text)`
  margin: unset;
  font-weight: 500;
  font-size: 24px;

  ${media.medium(css`
    font-size: 18px;
  `)}
`;

export const StyledFormattedDate = styled(Text)`
  margin: unset;
  font-weight: 500;
  font-size: 24px;

  ${media.medium(css`
    font-size: 18px;
  `)}
`;

export const StyledKOPISLabel = styled(Text)`
  margin: unset;
  font-weight: 500;
  font-size: 14px;

  color: ${semantics.color.foreground[4]};

  ${media.medium(css`
    font-size: 12px;
  `)}
`;
