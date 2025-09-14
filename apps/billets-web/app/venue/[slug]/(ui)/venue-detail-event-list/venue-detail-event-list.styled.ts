import { GlobalLink } from '@/shared/ui';
import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledVenueDetailEventListTitleText = styled(Text)`
  font-size: 28px;

  ${media.large(css`
    font-size: 20px;
  `)}
`;

export const StyledVenueDetailEventListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  ${media.small(css`
    grid-template-columns: repeat(1, 1fr);
  `)}
`;

export const StyledVenueDetailEventListItem = styled(GlobalLink)`
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;

  ${media.medium(css`
    margin-bottom: 1.5rem;
  `)}

  ${media.small(css`
    flex-direction: row;
    align-items: center;
  `)}
`;

export const StyledVenueDetailEventListItemThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: 50%;
  background-color: ${semantics.color.background[4]};

  border-radius: 12px;

  ${media.small(css`
    width: 100px;
    height: 100px;
  `)}
`;

export const StyledVenueDetailEventListItemThumbnailEmpty = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${semantics.color.background[1]};

  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${media.small(css`
    width: 100px;
    height: 100px;
  `)}
`;

export const StyledVenueDetailEventListItemThumbnailEmptyText = styled(Text)`
  font-size: 22px;
  text-align: center;
  font-weight: 600;

  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ${media.medium(css`
    font-size: 18px;
    padding-left: 1rem;
    padding-right: 1rem;
  `)}

  ${media.small(css`
    font-size: 14px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `)}
`;

export const StyledVenueDetailItemDescriptionWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  ${media.small(css`
    margin-top: unset;
    margin-left: 0.5rem;
  `)}
`;

export const StyledVenueDetailEventListItemTitleText = styled(Text)`
  font-size: 16px;

  margin: unset;

  color: ${semantics.color.foreground[1]};

  ${media.medium(css`
    font-size: 14px;
  `)}

  ${media.small(css`
    margin-top: unset;
  `)}
`;

export const StyledVenueDetailEventListItemDateText = styled(Text)`
  margin: unset;
  margin-top: 0.25rem;
  font-size: 16px;
  color: ${semantics.color.foreground[1]};

  ${media.medium(css`
    font-size: 14px;
  `)}
`;

export const StyledVenueDetailEventListItemVenueText = styled(Text)`
  margin: unset;
  margin-top: 0.25rem;
  font-size: 16px;
  color: ${semantics.color.foreground[1]};

  ${media.medium(css`
    font-size: 14px;
  `)}
`;
