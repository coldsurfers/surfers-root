import {
  StyledInfiniteHomeCollectionItem,
  StyledInfiniteHomeCollectionItemBottomWrapper,
  StyledInfiniteHomeCollectionItemThumbnailWrapper,
  StyledRecentListScrollContainerItem,
} from './infinite-carousel.styled';
import type { BreakpointT, DataT, ItemRenderT } from './infinite-carousel.types';

type Props = DataT & ItemRenderT & { breakpoints: BreakpointT[] };

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
  breakpoints,
}: Props) => {
  return renderItemWrapper(
    <StyledRecentListScrollContainerItem $breakpoints={breakpoints}>
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
