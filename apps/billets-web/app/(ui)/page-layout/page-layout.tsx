'use client';

import { useWindowWidth } from '@/shared/lib/use-window-width';
import { breakpoints } from '@coldsurfers/ocean-road';
import { VenueWithMemoEventList } from 'app/(components)/venue-with-memo-event-list';
import { useEffect, useLayoutEffect, useState } from 'react';
import { StyledHomeTop, StyledHomeWrapper } from './page-layout.styled';
import type { PageLayoutProps } from './page-layout.types';

const slugs = [
  '롤링홀',
  '채널1969',
  '웨스트브릿지-라이브홀',
  '블루스퀘어',
  '푸르지오아트홀',
  '고양종합운동장',
  '아르코예술극장',
  '예술의전당',
].sort(() => Math.random() - 0.5);

const COL_DEFAULT = 4;
const COL_SMALL = 3;

export function PageLayout({ top }: PageLayoutProps) {
  const windowWidth = useWindowWidth();
  const [col, setCol] = useState(4);

  useLayoutEffect(() => {
    setCol(windowWidth > breakpoints.small ? COL_DEFAULT : COL_SMALL);
  }, [windowWidth]);

  return (
    <StyledHomeWrapper>
      <StyledHomeTop>{top}</StyledHomeTop>
      {slugs.map((slug) => (
        <VenueWithMemoEventList key={slug} slug={slug} col={col} />
      ))}
    </StyledHomeWrapper>
  );
}
