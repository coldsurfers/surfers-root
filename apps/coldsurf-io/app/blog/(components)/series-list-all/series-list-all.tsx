'use client';

import type {
  OfficialBlogSeriesCategory,
  SeriesCategory,
  SeriesItem,
} from 'app/blog/(types)/series';
import { Pagination } from '../pagination';
import { PostPaginationList } from '../post-pagination-list';

type SeriesListAllProps = {
  isOfficialBlog: boolean;
  postItems: SeriesItem[];
  totalPage: number;
  currentPage: number;
  seriesCategory: SeriesCategory | OfficialBlogSeriesCategory | null;
};

export const SeriesListAll = ({
  postItems,
  totalPage,
  currentPage,
  seriesCategory,
  isOfficialBlog,
}: SeriesListAllProps) => {
  return (
    <>
      <PostPaginationList
        postItems={postItems}
        page={currentPage}
        isOfficialBlog={isOfficialBlog}
      />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        seriesCategory={seriesCategory}
        appLocale={'ko'}
        isOfficialBlog={Boolean(isOfficialBlog)}
      />
    </>
  );
};
