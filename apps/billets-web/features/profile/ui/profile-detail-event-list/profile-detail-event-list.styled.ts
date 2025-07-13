import { GlobalLink } from '@/shared/ui';
import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledArtistDetailEventListTitleText = styled(Text)`
  margin-top: 8rem;

  font-size: 28px;

  ${media.large(css`
    font-size: 20px;
  `)}

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`;

export const StyledArtistDetailEventListContainer = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledArtistDetailEventListItem = styled(GlobalLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledArtistDetailEventListItemThumbnail = styled.img`
  width: 110px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: 50%;
  border-radius: 8px;
  margin-right: 1rem;
`;

export const StyledArtistDetailEventListItemThumbnailEmpty = styled.div`
  width: 110px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: 50%;
  border-radius: 8px;
  margin-right: 1rem;

  background-color: ${semantics.color.background[1]};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledArtistDetailEventListItemThumbnailEmptyText = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 12px;

  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const StyledArtistDetailEventListItemDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledArtistDetailEventListItemTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin: unset;
  margin-bottom: 0.5rem;

  ${media.medium(css`
    font-size: 18px;
  `)}
`;

export const StyledArtistDetailEventListItemDate = styled(Text)`
  font-size: 18px;
  color: ${semantics.color.foreground[1]};

  margin: unset;
  margin-bottom: 0.25rem;

  ${media.medium(css`
    font-size: 16px;
  `)}
`;

export const StyledArtistDetailEventListItemVenueText = styled(Text)`
  font-size: 18px;
  color: ${semantics.color.foreground[1]};

  margin: unset;

  ${media.medium(css`
    font-size: 16px;
  `)}
`;
