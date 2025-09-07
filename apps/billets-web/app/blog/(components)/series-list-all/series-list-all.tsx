'use client';

import type { SeriesCategory, SeriesItem } from 'app/blog/(types)/series';
import { Pagination } from '../pagination';
import { PostPaginationList } from '../post-pagination-list';

type SeriesListAllProps = {
  postItems: SeriesItem[];
  totalPage: number;
  currentPage: number;
  seriesCategory: SeriesCategory | null;
};

export const SeriesListAll = ({
  postItems,
  totalPage,
  currentPage,
  seriesCategory,
}: SeriesListAllProps) => {
  return (
    <>
      <PostPaginationList postItems={postItems} page={currentPage} />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        seriesCategory={seriesCategory}
        appLocale={'ko'}
      />
    </>
  );
};
