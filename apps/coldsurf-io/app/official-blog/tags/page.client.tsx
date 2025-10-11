'use client';

import { PageLayout } from 'app/blog/(components)/page-layout';
import { TagList } from 'app/blog/(components)/tag-list/tag-list';
import type { fetchGetTags } from 'app/blog/(fetchers)';

export const TagsPageClient = ({
  tags,
}: { tags: Awaited<ReturnType<typeof fetchGetTags>>['tags'] }) => {
  return (
    <PageLayout title="Tags" isOfficialBlog>
      <div style={{ marginTop: '6.5rem' }} />
      {tags && <TagList tags={tags} isOfficialBlog />}
    </PageLayout>
  );
};
