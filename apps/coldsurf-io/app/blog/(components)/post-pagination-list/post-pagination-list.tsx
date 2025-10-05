'use client';

import { PAGINATION_PER_LINE, PAGINATION_PER_PAGE } from 'app/blog/(constants)';
import { memo, useMemo } from 'react';
import type { SeriesItem } from '../../(types)/series';
import { PostItem } from '../post-item';
import { PostListContainer } from '../post-list-container';
import { StyledPostListContainer } from './post-pagination-list.styled';

type PostListProps = { postItems: SeriesItem[]; page: number };

export const PostPaginationList = memo(({ postItems, page }: PostListProps) => {
  const offset = useMemo(() => (page - 1) * PAGINATION_PER_PAGE, [page]);

  return (
    <StyledPostListContainer>
      <PostListContainer>
        {postItems.slice(offset, offset + PAGINATION_PER_LINE).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {postItems
          .slice(offset + PAGINATION_PER_LINE, offset + PAGINATION_PER_LINE * 2)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
      </PostListContainer>
      <PostListContainer>
        {postItems
          .slice(offset + PAGINATION_PER_LINE * 2, offset + PAGINATION_PER_LINE * 3)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
      </PostListContainer>
    </StyledPostListContainer>
  );
});
