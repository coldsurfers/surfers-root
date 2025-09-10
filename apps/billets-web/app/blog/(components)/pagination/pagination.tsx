'use client';

import { GlobalLink } from '@/shared/ui';
import { Text } from '@coldsurfers/ocean-road';
import type { AppLocale } from 'app/blog/(types)/i18n';
import type { SeriesCategory } from 'app/blog/(types)/series';
import { generateSeriesHref } from 'app/blog/(utils)';
import { useMemo } from 'react';
import {
  MoveLeftIcon,
  MoveRightIcon,
  PageMoveButton,
  StyledPaginationContainer,
} from './pagination.styled';

type PaginationProps = {
  seriesCategory: SeriesCategory | null;
  currentPage: number;
  totalPage: number;
  appLocale: AppLocale;
};

export function Pagination({ currentPage, seriesCategory, totalPage }: PaginationProps) {
  const seriesHrefPrev = useMemo(
    () =>
      generateSeriesHref({
        seriesCategory: seriesCategory ?? undefined,
        query: {
          page: currentPage - 1 > 0 ? currentPage - 1 : 1,
        },
      }),
    [currentPage, seriesCategory]
  );

  const seriesHrefNext = useMemo(
    () =>
      generateSeriesHref({
        seriesCategory: seriesCategory ?? undefined,
        query: {
          page: currentPage + 1 >= totalPage ? totalPage : currentPage + 1,
        },
      }),
    [currentPage, seriesCategory, totalPage]
  );

  return (
    <StyledPaginationContainer>
      <Text as="p">
        {currentPage}/{totalPage}
      </Text>
      <GlobalLink href={seriesHrefPrev}>
        <PageMoveButton>
          <MoveLeftIcon />
        </PageMoveButton>
      </GlobalLink>
      <GlobalLink href={seriesHrefNext}>
        <PageMoveButton>
          <MoveRightIcon />
        </PageMoveButton>
      </GlobalLink>
    </StyledPaginationContainer>
  );
}
