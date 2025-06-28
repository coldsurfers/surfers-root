'use client';

import { initialPageQuery } from '@/libs/openapi-client';
import { useQuery } from '@tanstack/react-query';
import { type ResolvedValues, useAnimation } from 'framer-motion';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { RecentConcertListItem } from './recent-concert-list-item';
import {
  StyledMotionDiv,
  StyledRecentListBilletsConcertCard,
  StyledRecentListScrollContainer,
  StyledRecentListTitle,
} from './recent-concert-list.styled';

export const RecentConcertList = () => {
  const { data, isLoading } = useQuery(initialPageQuery.home());

  const controls = useAnimation();
  const latestX = useRef<string>('0%');

  const startAnim = useCallback(() => {
    controls.start({
      x: [latestX.current, '-100%'], // Moves from start to end
    });
  }, [controls]);

  const onUpdate = useCallback((latest: ResolvedValues) => {
    if (latest.x) {
      latestX.current = latest.x as string;
    }
  }, []);

  useLayoutEffect(() => {
    startAnim();
  }, [startAnim]);

  return (
    <>
      <StyledRecentListTitle as="h2">다가오는 일정의 공연</StyledRecentListTitle>
      <StyledRecentListScrollContainer
        onMouseEnter={controls.stop}
        onMouseLeave={startAnim}
        onTouchStart={controls.stop}
        onTouchEnd={startAnim}
        onScroll={(e) => e.preventDefault()}
      >
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            {Array.from({ length: 10 }, (_, index) => ({
              index,
              id: index,
            })).map((value) => (
              <StyledRecentListBilletsConcertCard key={value.id} $isLoading />
            ))}
          </div>
        ) : (
          <StyledMotionDiv
            initial={{ x: '0%' }}
            animate={controls}
            transition={{
              repeat: Number.POSITIVE_INFINITY, // Loops indefinitely
              duration: 60, // Adjust speed (higher = slower)
              ease: 'linear', // Smooth constant scroll
            }}
            onUpdate={onUpdate}
          >
            {data?.map((value) => {
              if (value.type === 'concert') {
                return <RecentConcertListItem data={value.data} key={value.data.id} />;
              }
              return null;
            })}
          </StyledMotionDiv>
        )}
      </StyledRecentListScrollContainer>
    </>
  );
};
