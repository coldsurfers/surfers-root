'use client';

import { useWindowWidth } from '@/shared/lib/use-window-width';
import { breakpoints } from '@coldsurfers/ocean-road';
import { VenueWithMemoEventList } from 'app/(components)/venue-with-memo-event-list';
import { useLayoutEffect, useState } from 'react';
import { HOME_COLLECTION_COL_DEFAULT, HOME_COLLECTION_COL_SMALL } from '../constants';
import { StyledHomeTop, StyledHomeWrapper } from './page-layout.styled';
import type { PageLayoutProps } from './page-layout.types';

const INITIAL_WINDOW_WIDTH = 0;

export function PageLayout({ top, slugs }: PageLayoutProps) {
  const windowWidth = useWindowWidth(INITIAL_WINDOW_WIDTH);
  const [col, setCol] = useState(() => {
    if (windowWidth === INITIAL_WINDOW_WIDTH) {
      return HOME_COLLECTION_COL_DEFAULT;
    }
    return windowWidth > breakpoints.small
      ? HOME_COLLECTION_COL_DEFAULT
      : HOME_COLLECTION_COL_SMALL;
  });

  useLayoutEffect(() => {
    setCol(
      windowWidth > breakpoints.small ? HOME_COLLECTION_COL_DEFAULT : HOME_COLLECTION_COL_SMALL
    );
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
