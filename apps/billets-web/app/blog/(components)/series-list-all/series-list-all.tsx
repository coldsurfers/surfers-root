'use client';

import type { SeriesItem } from 'app/blog/(types)/series';
import { Pagination } from '../pagination';
import { PostPaginationList } from '../post-pagination-list';

type SeriesListAllProps = {
  allPostItems: SeriesItem[];
  totalPage: number;
  currentPage: number;
};

export const SeriesListAll = ({ allPostItems, totalPage, currentPage }: SeriesListAllProps) => {
  return (
    <>
      <PostPaginationList postItems={allPostItems} page={currentPage} />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        seriesCategory={null}
        appLocale={'ko'}
      />
    </>
  );
};
