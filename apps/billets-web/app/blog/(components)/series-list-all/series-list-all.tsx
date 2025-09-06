'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PAGINATION_PER_PAGE } from 'app/blog/(constants)';
import type { fetchGetSeries } from 'app/blog/(fetchers)';
import { queryKeyFactory } from 'app/blog/(react-query)/react-query.key-factory';
import { useMemo } from 'react';
import { Pagination } from '../pagination';
import { PostPaginationList } from '../post-pagination-list';

type SeriesListAllProps = {
  page: number;
};

export const SeriesListAll = ({ page }: SeriesListAllProps) => {
  const { data } = useSuspenseQuery({
    ...queryKeyFactory.series.listAll('ko'),
    staleTime: Number.POSITIVE_INFINITY, // 신선 → 리마운트시 refetch 안 함
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const postItems = useMemo(
    () =>
      data
        .flat()
        .filter((value) => value !== null)
        .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()),
    [data]
  );

  return (
    <>
      <PostPaginationList postItems={postItems} page={page} />
      <Pagination
        currentPage={page}
        totalPage={Math.ceil(postItems.length / PAGINATION_PER_PAGE)}
        seriesCategory={null}
        appLocale={'ko'}
      />
    </>
  );
};
