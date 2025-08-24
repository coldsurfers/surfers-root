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
import type { DataT, ItemWrapperT } from './infinite-carousel.types';

type Props = DataT & {
  renderItemWrapper: ItemWrapperT;
};

export const InfiniteHomeCollectionItem = ({
  dateDescription,
  posterSrc,
  title,
  venueName,
  renderItemWrapper,
}: Props) => {
  const thumbUrl = useMemo(() => {
    if (!posterSrc) {
      return '';
    }
    return `${posterSrc}`;
  }, [posterSrc]);

  return renderItemWrapper(
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
    </StyledRecentListScrollContainerItem>,
    {
      dateDescription,
      posterSrc,
      title,
      venueName,
    }
  );
};
