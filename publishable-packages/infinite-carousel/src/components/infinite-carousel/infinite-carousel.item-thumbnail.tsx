import { useState } from 'react';
import {
  StyledInfiniteHomeCollectionItemThumbnail,
  StyledInfiniteHomeCollectionItemThumbnailEmpty,
} from './infinite-carousel.styled';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackText?: string;
};

export const InfiniteHomeCollectionItemThumbnail = ({
  src,
  alt = '',
  fallbackText,
  ...rest
}: ImageWithFallbackProps) => {
  const [isError, setIsError] = useState(false);
  if (isError || src === '') {
    return <StyledInfiniteHomeCollectionItemThumbnailEmpty />;
  }
  return (
    <StyledInfiniteHomeCollectionItemThumbnail
      src={src}
      alt={alt}
      onError={() => setIsError(true)}
      {...rest}
    />
  );
};
