'use client';

import { PageLayout } from 'app/blog/(components)/page-layout/page-layout';
import { PostItem } from 'app/blog/(components)/post-item';
import { PostListContainer } from 'app/blog/(components)/post-list-container';
import type { SeriesItem } from 'app/blog/(types)/series';
import { memo } from 'react';

type TagPostListProps = { tag: string; postItems: SeriesItem[]; isOfficialBlog?: boolean };

export const TagPostList = memo(({ tag, postItems, isOfficialBlog }: TagPostListProps) => {
  return (
    <PageLayout title={`#${tag}`} isOfficialBlog={isOfficialBlog}>
      <div style={{ marginTop: '6.5rem' }} />
      <PostListContainer>
        {postItems.map((post) => (
          <PostItem key={post.id} {...post} isOfficialBlog={isOfficialBlog} />
        ))}
      </PostListContainer>
    </PageLayout>
  );
});
