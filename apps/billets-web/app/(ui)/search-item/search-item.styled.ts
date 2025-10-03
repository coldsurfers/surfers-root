import { Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import Link from 'next/link';
import { SEARCH_ITEM_ARTIST_THUMBNAIL_SIZE } from './search-item.constants';

export const SearchItemThumbnailCircle = styled.img`
  width: ${SEARCH_ITEM_ARTIST_THUMBNAIL_SIZE}px;
  height: ${SEARCH_ITEM_ARTIST_THUMBNAIL_SIZE}px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${semantics.color.background[3]};
`;

export const SearchItemEventThumbnailSquare = styled(SearchItemThumbnailCircle)`
  border-radius: 8px;
`;

export const StyledSearchItemLink = styled(Link)`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 0.75rem;
  }
`;

export const StyledSearchItemRightInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export const StyledSearchItemMainText = styled(Text)`
  font-weight: bold;
  margin: unset;
  font-size: 16px;

  color: ${semantics.color.foreground[1]};
`;

export const StyledSearchItemSubText = styled(Text)`
  margin: unset;
  margin-top: 0.125rem;
  font-size: 14px;

  color: ${semantics.color.foreground[1]};
`;
