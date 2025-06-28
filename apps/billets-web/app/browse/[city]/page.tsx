import { COMMON_META_DESCRIPTION, COMMON_META_TITLE } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { initialPageQuery } from '@/libs/openapi-client';
import { ApiErrorBoundaryRegistry } from '@/libs/registries';
import { getQueryClient, validateCityParam } from '@/libs/utils';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { RouteLoading } from 'app/(ui)';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ConcertList } from './(components)';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const validation = await validateCityParam((await params).city);
  if (!validation.isValid) {
    const openGraph: Metadata['openGraph'] = {
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
    };
    return metadataInstance.generateMetadata<Metadata>({
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
      openGraph,
    });
  }
  const openGraph: Metadata['openGraph'] = {
    title: `${validation.data.uiName}의 라이브 공연, 전시, 사운드 - ${SERVICE_NAME}`,
    description: COMMON_META_DESCRIPTION,
  };
  return metadataInstance.generateMetadata<Metadata>({
    title: `${validation.data.uiName}의 라이브 공연, 전시, 사운드 - ${SERVICE_NAME}`,
    description: COMMON_META_DESCRIPTION,
    openGraph,
  });
}

async function PageInner({ params }: { params: { city: string } }) {
  const cityParamValidation = await validateCityParam(params.city);

  if (!cityParamValidation.isValid) {
    return redirect('/404');
  }

  const { data: cityData } = cityParamValidation;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    initialPageQuery.browseEvents({ cityName: cityData.name })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConcertList cityData={cityData} />
    </HydrationBoundary>
  );
}

export default async function BrowseByCityPage(props: { params: Promise<{ city: string }> }) {
  const params = await props.params;
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  );
}
