import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import { fetchGetTags } from '../(fetchers)';
import { TagsPageClient } from './page.client';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function TagsPage() {
  const data = await fetchGetTags({ isOfficialBlog: false });

  return (
    <GlobalErrorBoundaryRegistry>
      <TagsPageClient tags={data.tags} />
    </GlobalErrorBoundaryRegistry>
  );
}
