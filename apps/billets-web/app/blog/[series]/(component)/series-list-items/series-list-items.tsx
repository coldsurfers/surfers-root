'use client';

import { useQuery } from '@tanstack/react-query';
import { Pagination } from 'app/blog/(components)/pagination';
import { PostPaginationList } from 'app/blog/(components)/post-pagination-list';
import { PAGINATION_PER_PAGE } from 'app/blog/(constants)';
import { queryKeyFactory } from 'app/blog/(react-query)/react-query.key-factory';
import type { SeriesCategory } from 'app/blog/(types)/series';
import { useMemo } from 'react';

export function SeriesListItems({
  seriesCategory,
  page,
}: { seriesCategory: SeriesCategory; page: number }) {
  const { data } = useQuery(
    queryKeyFactory.series.list({
      seriesCategory,
      appLocale: 'ko',
    })
  );

  const postItems = useMemo(() => data ?? [], [data]);

  return (
    <>
      <PostPaginationList postItems={postItems} page={page} />
      <Pagination
        currentPage={page}
        totalPage={Math.ceil(postItems.length / PAGINATION_PER_PAGE)}
        seriesCategory={seriesCategory}
        appLocale={'ko'}
      />
    </>
  );
}
