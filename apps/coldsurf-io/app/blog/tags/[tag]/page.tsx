import { GlobalErrorBoundaryRegistry } from '@/libs/registries';
import { fetchGetSeriesListAllStatic } from 'app/blog/(fetchers)';
import { queryTags } from 'app/blog/(notion)/query';
import { TagPostList } from './(ui)';

export async function generateStaticParams() {
  const allTags = await queryTags();
  const params = allTags.map((tag) => {
    return {
      tag: tag.name,
    };
  });
  return params;
}

export default async function TagDetailPage(props: {
  params: Promise<{
    tag: string;
  }>;
}) {
  const params = await props.params;
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);

  const { allPostItems } = await fetchGetSeriesListAllStatic({ tag: decodedTag });

  return (
    <GlobalErrorBoundaryRegistry>
      <TagPostList tag={decodedTag} postItems={allPostItems} />
    </GlobalErrorBoundaryRegistry>
  );
}
