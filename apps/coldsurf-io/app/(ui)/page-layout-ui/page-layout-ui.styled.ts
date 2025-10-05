import { breakpoints } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { APP_CONTAINER_PADDING, APP_CONTAINER_PADDING_LARGE } from '../constants';

export const StyledPageLayoutUI = styled.div<{ $isHome: boolean }>`
  padding: ${({ $isHome }) => ($isHome ? 'unset' : `0 ${APP_CONTAINER_PADDING}px`)};
  @media (max-width: ${breakpoints.large}px) {
    padding: ${({ $isHome }) => ($isHome ? 'unset' : `0 ${APP_CONTAINER_PADDING_LARGE}px`)};
  }
`;
