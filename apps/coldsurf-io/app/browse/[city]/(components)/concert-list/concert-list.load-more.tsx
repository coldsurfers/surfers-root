'use client';

import { Spinner } from '@coldsurfers/ocean-road';
import { useEffect, useRef } from 'react';
import { StyledLoadMoreContainer } from './concert-list.styled';

export function ConcertListLoadMore({ onLoadMore }: { onLoadMore: () => void }) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      });
    });
    const refToObserve = loadMoreRef.current;
    if (refToObserve) {
      intersectionObserver.observe(refToObserve);
    }

    return () => {
      if (refToObserve) {
        intersectionObserver.unobserve(refToObserve);
      }
    };
  }, [onLoadMore]);
  return (
    <StyledLoadMoreContainer ref={loadMoreRef}>
      <Spinner />
    </StyledLoadMoreContainer>
  );
}
