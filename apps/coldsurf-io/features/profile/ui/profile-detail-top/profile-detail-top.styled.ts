import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Info } from 'lucide-react';

export const StyledArtistDetailTopContainer = styled.section`
  display: flex;
  flex-direction: row;

  ${media.medium(css`
    flex-direction: column-reverse;
  `)}
`;

export const StyledArtistDetailTopLeft = styled.div`
  flex: 0.5;
  display: flex;
`;

export const StyledArtistDetailTopRight = styled.div`
  flex: 0.5;

  ${media.medium(css`
    margin-bottom: 1rem;
  `)}
`;

export const StyledArtistThumbnailWrapper = styled.div`
  max-width: calc(405px + 37.5vw);
  width: 100%;

  aspect-ratio: 1 / 1;
  transform: translate(0px, 82px);

  border-radius: 1rem;

  background-color: transparent;

  ${media.medium(css`
    transform: none;
  `)}
`;

export const StyledArtistThumbnail = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 1rem;

  cursor: pointer;
  user-select: none;
`;

export const StyledInfoIcon = styled(Info)`
  margin-left: auto;
  cursor: pointer;
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledArtistTopDescriptionWrapper = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledArtistTopSectionTitleText = styled(Text)`
  font-size: 28px;

  color: ${semantics.color.foreground[4]};
  ${media.medium(css`
    font-size: 24px;
  `)};
`;

export const StyledArtistNameText = styled(Text)`
  font-size: 64px;

  ${media.large(css`
    font-size: 36px;
  `)}
`;
