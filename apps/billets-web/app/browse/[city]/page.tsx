import { initialPageQuery } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient, validateCityParam } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { RouteLoading } from 'app/(ui)'
import { redirect } from 'next/navigation'
import { ConcertList } from './(components)'

async function PageInner({ params }: { params: { city: string } }) {
  const cityParamValidation = await validateCityParam(params.city)

  if (!cityParamValidation.isValid) {
    return redirect('/404')
  }

  const { data: cityData } = cityParamValidation

  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery(initialPageQuery.browseEvents({ cityName: cityData.name }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConcertList cityData={cityData} />
    </HydrationBoundary>
  )
}

export default async function BrowseByCityPage(props: { params: Promise<{ city: string }> }) {
  const params = await props.params
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  )
}
