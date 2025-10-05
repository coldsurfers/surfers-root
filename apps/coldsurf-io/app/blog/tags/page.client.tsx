'use client';

import { PageLayout } from '../(components)/page-layout';
import { TagList } from '../(components)/tag-list/tag-list';
import type { fetchGetTags } from '../(fetchers)';

export const TagsPageClient = ({
  tags,
}: { tags: Awaited<ReturnType<typeof fetchGetTags>>['tags'] }) => {
  return (
    <PageLayout title="Tags">
      <div style={{ marginTop: '6.5rem' }} />
      {tags && <TagList tags={tags} />}
    </PageLayout>
  );
};
