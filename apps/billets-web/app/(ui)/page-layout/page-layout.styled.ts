import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { APP_CONTAINER_PADDING_LARGE } from '../constants';

export const StyledHomeWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  z-index: 0;
  padding-bottom: 12rem;

  ${media.medium(css`
    padding-bottom: 6rem;
  `)}

  ${media.small(css`
    padding-bottom: 4rem;
  `)}
`;

export const StyledHomeTop = styled.div`
  ${media.large(css`
    padding: 0 ${APP_CONTAINER_PADDING_LARGE}px;
  `)}
`;
