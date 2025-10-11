'use client';

import { GlobalLink } from '@/shared/ui';
import { Text } from '@coldsurfers/ocean-road';
import type { AppLocale } from 'app/blog/(types)/i18n';
import type { OfficialBlogSeriesCategory, SeriesCategory } from 'app/blog/(types)/series';
import { generateSeriesHref } from 'app/blog/(utils)';
import { useMemo } from 'react';
import {
  MoveLeftIcon,
  MoveRightIcon,
  PageMoveButton,
  StyledPaginationContainer,
} from './pagination.styled';

type PaginationProps = {
  isOfficialBlog: boolean;
  seriesCategory: SeriesCategory | OfficialBlogSeriesCategory | null;
  currentPage: number;
  totalPage: number;
  appLocale: AppLocale;
};

export function Pagination({
  currentPage,
  seriesCategory,
  totalPage,
  isOfficialBlog,
}: PaginationProps) {
  const seriesHrefPrev = useMemo(
    () =>
      generateSeriesHref({
        seriesCategory: seriesCategory ?? undefined,
        isOfficialBlog,
        query: {
          page: currentPage - 1 > 0 ? currentPage - 1 : 1,
        },
      }),
    [currentPage, seriesCategory, isOfficialBlog]
  );

  const seriesHrefNext = useMemo(
    () =>
      generateSeriesHref({
        seriesCategory: seriesCategory ?? undefined,
        isOfficialBlog,
        query: {
          page: currentPage + 1 >= totalPage ? totalPage : currentPage + 1,
        },
      }),
    [currentPage, seriesCategory, totalPage, isOfficialBlog]
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
