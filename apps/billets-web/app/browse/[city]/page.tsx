import { COMMON_META_DESCRIPTION, COMMON_META_TITLE } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { initialPageQuery } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient, validateCityParam } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { RouteLoading } from 'app/(ui)'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ConcertList } from './(components)'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const validation = await validateCityParam((await params).city)
  if (!validation.isValid) {
    const openGraph: Metadata['openGraph'] = {
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
    }
    return metadataInstance.generateMetadata<Metadata>({
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
      openGraph,
    })
  }
  const openGraph: Metadata['openGraph'] = {
    title: `Popular shows in ${validation.data.uiName} | Billets`,
    description: COMMON_META_DESCRIPTION,
  }
  return metadataInstance.generateMetadata<Metadata>({
    title: `Popular shows in ${validation.data.uiName} | Billets`,
    description: COMMON_META_DESCRIPTION,
    openGraph,
  })
}

async function PageInner({ params }: { params: { city: string } }) {
  const cityParamValidation = await validateCityParam(params.city)

  if (!cityParamValidation.isValid) {
    return redirect('/404')
  }

  const { data: cityData } = cityParamValidation

  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchInfiniteQuery(initialPageQuery.browseByCity(cityData))
  } catch (e) {
    console.error(e)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConcertList cityData={cityData} />
    </HydrationBoundary>
  )
}

export default async function BrowseByCityPage({ params }: { params: Promise<{ city: string }> }) {
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <PageInner params={await params} />
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  )
}
