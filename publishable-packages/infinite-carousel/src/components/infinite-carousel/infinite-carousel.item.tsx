import { useMemo } from 'react';
import { InfiniteHomeCollectionItemThumbnail } from './infinite-carousel.item-thumbnail';
import {
  StyledInfiniteHomeCollectionItem,
  StyledInfiniteHomeCollectionItemBottomWrapper,
  StyledInfiniteHomeCollectionItemDescriptionText,
  StyledInfiniteHomeCollectionItemThumbnailWrapper,
  StyledInfiniteHomeCollectionItemTitle,
  StyledRecentListScrollContainerItem,
} from './infinite-carousel.styled';
import type { DataT } from './infinite-carousel.types';

type Props = DataT;

export const InfiniteHomeCollectionItem = ({
  dateDescription,
  posterSrc,
  title,
  venueName,
}: Props) => {
  const thumbUrl = useMemo(() => {
    if (!posterSrc) {
      return '';
    }
    return `${posterSrc}`;
  }, [posterSrc]);

  return (
    <StyledRecentListScrollContainerItem>
      <StyledInfiniteHomeCollectionItem $isLoading={false}>
        <StyledInfiniteHomeCollectionItemThumbnailWrapper>
          <InfiniteHomeCollectionItemThumbnail src={thumbUrl} alt={title} fallbackText={title} />
        </StyledInfiniteHomeCollectionItemThumbnailWrapper>
        <StyledInfiniteHomeCollectionItemBottomWrapper>
          <StyledInfiniteHomeCollectionItemTitle as="p">
            {title}
          </StyledInfiniteHomeCollectionItemTitle>
          <StyledInfiniteHomeCollectionItemDescriptionText as="p" $marginTop={4}>
            {dateDescription}
          </StyledInfiniteHomeCollectionItemDescriptionText>
          <StyledInfiniteHomeCollectionItemDescriptionText as="p">
            {venueName}
          </StyledInfiniteHomeCollectionItemDescriptionText>
        </StyledInfiniteHomeCollectionItemBottomWrapper>
      </StyledInfiniteHomeCollectionItem>
    </StyledRecentListScrollContainerItem>
  );
};
