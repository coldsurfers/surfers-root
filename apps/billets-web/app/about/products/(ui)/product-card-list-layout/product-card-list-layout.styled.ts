import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ProductCardListLayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  min-width: 0px;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const ProductCardListLayoutContainer = styled.div`
  display: grid;
  gap: 64px 32px;
  grid-template-columns: repeat(3, 1fr);

  width: 100%;

  max-width: 1728px;

  padding-left: 156px;
  padding-right: 156px;

  ${media['x-large'](css`
    padding-left: 128px;
    padding-right: 128px;
  `)}

  ${media.large(css`
    max-width: 1536px;
    grid-template-columns: repeat(2, 1fr);
  `)}

  ${media.medium(css`
    min-height: auto;
    padding-left: 24px;
    padding-right: 24px;

    gap: 32px 18px;

    max-width: none;
  `)}

  ${media.small(css`
    padding-left: 16px;
    padding-right: 16px;
    /* grid-template-columns: repeat(1, 1fr); */
  `)}
`;
