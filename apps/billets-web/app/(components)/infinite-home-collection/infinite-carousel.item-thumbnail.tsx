'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { type ImgHTMLAttributes, forwardRef, useState } from 'react';

type ImageWithFallbackProps = Pick<ImgHTMLAttributes<HTMLDivElement>, 'src' | 'alt' | 'onError'>;

const StyledInfiniteHomeCollectionItemThumbnail = styled.div<{ $url: string }>`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  object-position: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.$url});
  background-size: cover;
  background-position: center;
`;

const Thumbnail = forwardRef<HTMLDivElement, ImageWithFallbackProps>((props, ref) => {
  return <StyledInfiniteHomeCollectionItemThumbnail ref={ref} {...props} $url={props.src ?? ''} />;
});

const StyledInfiniteHomeCollectionItemThumbnailEmpty = styled.div`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  object-position: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
`;

const MotionThumbnail = motion.create(Thumbnail);

export const InfiniteHomeCollectionItemThumbnail = ({ src, alt = '' }: ImageWithFallbackProps) => {
  const [isError, setIsError] = useState(false);
  if (isError || src === '') {
    return <StyledInfiniteHomeCollectionItemThumbnailEmpty />;
  }
  return (
    <MotionThumbnail
      whileHover={{
        scale: 1.05,
      }}
      whileFocus={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 1.05,
      }}
      initial={{
        scale: 1,
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      src={src}
      alt={alt}
      onError={() => setIsError(true)}
    />
  );
};
