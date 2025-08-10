import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { APP_CONTAINER_PADDING, APP_CONTAINER_PADDING_LARGE } from '../constants';

export const StyledPageLayoutUI = styled.div`
  padding: 0 ${APP_CONTAINER_PADDING}px;
  ${media.large(css`
    padding: 0 ${APP_CONTAINER_PADDING_LARGE}px;
  `)}
`;
