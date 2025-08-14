'use client';

import { useState } from 'react';
import {
  StyledRecentListBilletsConcertCardImage,
  StyledRecentListBilletsConcertCardImageEmpty,
} from './recent-concert-list.styled';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackText?: string;
};

export const RecentConcertListItemThumbnail = ({
  src,
  alt = '',
  fallbackText,
  ...rest
}: ImageWithFallbackProps) => {
  const [isError, setIsError] = useState(false);
  if (isError || src === '') {
    return <StyledRecentListBilletsConcertCardImageEmpty />;
  }
  return (
    <StyledRecentListBilletsConcertCardImage
      src={src}
      alt={alt}
      onError={() => setIsError(true)}
      {...rest}
    />
  );
};
