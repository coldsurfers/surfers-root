'use client';

import { Spinner } from '@coldsurfers/ocean-road';
import { useQuery } from '@tanstack/react-query';
import { PageLayout } from 'app/blog/(components)/page-layout/page-layout';
import { PostItem } from 'app/blog/(components)/post-item';
import { PostListContainer } from 'app/blog/(components)/post-list-container';
import { queryKeyFactory } from 'app/blog/(react-query)/react-query.key-factory';
import type { AppLocale } from 'app/blog/(types)/i18n';
import { memo, useMemo } from 'react';

type TagPostListProps = { locale: AppLocale; tag: string };

export const TagPostList = memo(({ locale, tag }: TagPostListProps) => {
  const { data: series, isLoading: isLoadingSeries } = useQuery(
    queryKeyFactory.series.listAll(locale, tag)
  );

  const logs = useMemo(() => {
    return series?.flat() ?? [];
  }, [series]);
  const isLoading = isLoadingSeries;
  if (isLoading) {
    return <Spinner variant="page-overlay" />;
  }

  return (
    <PageLayout title={`#${tag}`}>
      <div style={{ marginTop: '6.5rem' }} />
      <PostListContainer>
        {logs
          .filter((value) => value !== null)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
      </PostListContainer>
    </PageLayout>
  );
});
