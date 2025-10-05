import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { APP_CONTAINER_PADDING_LARGE } from 'app/(ui)/constants';

export const StyledInfiniteHomeCollectionTitle = styled(Text)`
  font-weight: bold;

  margin-top: 125px;

  display: flex;
  align-items: center;
  width: fit-content;

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
`;

export const StyledInfiniteHomeCollectionItemTitle = styled(Text)`
  font-size: 1.25rem;

  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 1rem;
  margin-bottom: 0;

  ${media['x-large'](css`
    font-size: 1rem;
  `)};

  ${media.medium(css`
    font-size: 0.9rem;
    margin-top: 0.5rem;
  `)};
`;

export const StyledInfiniteHomeCollectionItemDescriptionText = styled(Text)<{
  $marginTop?: number;
}>`
  font-size: 1.1rem;
  font-weight: 500;
  overflow-wrap: break-word;
  white-space: normal;
  margin-bottom: 0;
  margin-top: ${(props) => props.$marginTop ?? 0}px;

  ${media['x-large'](css`
    font-size: 0.9rem;
  `)};

  ${media.medium(css`
    font-size: 0.8rem;
  `)};
`;
