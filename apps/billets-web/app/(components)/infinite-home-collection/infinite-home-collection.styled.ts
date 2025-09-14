import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { APP_CONTAINER_PADDING_LARGE } from 'app/(ui)/constants';

export const StyledInfiniteHomeCollectionTitle = styled(Text)`
  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 125px;
  display: flex;
  align-items: center;
  padding-left: 2%;
  ${media['x-large'](css`
    padding-left: 5%;
  `)}
  ${media.large(css`
    padding-left: ${APP_CONTAINER_PADDING_LARGE}px;
  `)}
  ${media.medium(css`
    margin-top: 88px;
    font-size: 24px;
  `)}
  ${media.small(css`
    margin-top: 44px;
    font-size: 20px;
  `)}
  svg {
    display: none;
  }
  &:hover {
    svg {
      display: block;
    }
  }
`;
