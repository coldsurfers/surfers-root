import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledFigure = styled.figure`
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: unset;

  ${media.medium(css`
    height: 100%;
    aspect-ratio: unset;
    /* aspect-ratio: 4 / 3; */
  `)}
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: 50%;
  background-color: ${semantics.color.background[4]};
  border-radius: 1rem;
`;

export const StyledFigcaption = styled.figcaption`
  text-align: center;
  background-color: ${semantics.color.background[3]};
  margin: unset;
  padding: 1rem;
  border-radius: 1rem;
`;

export const StyledFigcaptionText = styled(Text)`
  color: ${semantics.color.foreground[3]};
  font-size: 14px;
  font-weight: 500;
  margin: unset;

  ${media.medium(css`
    font-size: 12px;
  `)}
`;
