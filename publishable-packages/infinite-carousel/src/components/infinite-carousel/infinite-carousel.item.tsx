import {
  StyledInfiniteHomeCollectionItem,
  StyledInfiniteHomeCollectionItemBottomWrapper,
  StyledInfiniteHomeCollectionItemThumbnailWrapper,
  StyledRecentListScrollContainerItem,
} from './infinite-carousel.styled';
import type { DataT, ItemRenderT } from './infinite-carousel.types';

type Props = DataT & ItemRenderT;

export const InfiniteHomeCollectionItem = ({
  posterSrc,
  title,
  dateDescription,
  venueName,
  renderPoster,
  renderTitle,
  renderDateDescription,
  renderVenueName,
  renderItemWrapper,
}: Props) => {
  return renderItemWrapper(
    <StyledRecentListScrollContainerItem>
      <StyledInfiniteHomeCollectionItem $isLoading={false}>
        <StyledInfiniteHomeCollectionItemThumbnailWrapper>
          {renderPoster(posterSrc)}
        </StyledInfiniteHomeCollectionItemThumbnailWrapper>
        <StyledInfiniteHomeCollectionItemBottomWrapper>
          {renderTitle(title)}
          {renderDateDescription(dateDescription)}
          {renderVenueName(venueName)}
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
