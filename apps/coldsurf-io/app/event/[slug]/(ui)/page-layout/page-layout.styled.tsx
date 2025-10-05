import { APP_HEADER_HEIGHT } from '@/shared/ui/constants';
import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledPageLayout = styled.div`
  position: relative; /* Required for sticky */
  display: flex;
  align-items: flex-start;

  ${media.medium(css`
    flex-direction: column;
    align-items: center;
  `)}
`;

export const StyledPosterContainer = styled.div`
  position: sticky;
  top: calc(${APP_HEADER_HEIGHT} + 32px);
  left: 2rem;
  width: 320px;
  aspect-ratio: 1 / 1;
  flex: 1;

  ${media.medium(css`
    width: 100%;
    position: static;
  `)}
`;

export const StyledRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.75;
  margin-left: 48px;

  ${media.large(css`
    margin-left: 62px;
    width: 100%;
  `)}

  ${media.medium(css`
    margin-left: 0px;
  `)}
`;

export const StyledTopInfoContainer = styled.section``;

export const StyledTicketCTAContainer = styled.section`
  margin-top: 3rem;
`;

export const StyledSectionContainer = styled.section`
  border-bottom: 1px solid ${semantics.color.border[2]};
  margin-top: 3rem;
  padding-bottom: 3rem;
`;

export const StyledSectionHeaderText = styled(Text)`
  font-weight: 500;
  font-size: 24px;
  margin: unset;

  ${media.medium(css`
    font-size: 18px;
  `)}
`;
