import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient, validateCityParam } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PageProps } from 'types/common-types'
import { ConcertList } from './(components)'

export const revalidate = 600

export async function generateMetadata({ params }: PageProps<{ city: string }>): Promise<Metadata> {
  const validation = await validateCityParam(params.city)
  if (!validation.isValid) {
    return {
      title: 'Billets | Discover shows around the world',
      description:
        'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
    }
  }
  return {
    title: `Popular shows in ${validation.data.uiName} | Billets`,
    description:
      'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
  }
}

async function PageInner({ params }: PageProps<{ city: string }>) {
  const validation = await validateCityParam(params.city)

  if (!validation.isValid) {
    return redirect('/404')
  }

  const cityData = validation.data

  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.concerts.queryKeys.getConcerts({
        offset: 0,
        size: 100,
        latitude: cityData.lat,
        longitude: cityData.lng,
      }),
      queryFn: () =>
        apiClient.concerts.getConcerts({
          offset: 0,
          size: 100,
          latitude: cityData.lat,
          longitude: cityData.lng,
        }),
    })
  } catch (e) {
    console.error(e)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConcertList cityData={cityData} />
    </HydrationBoundary>
  )
}

export default async function BrowseByCityPage(props: PageProps<{ city: string }>) {
  return (
    <ApiErrorBoundaryRegistry>
      <PageInner {...props} />
    </ApiErrorBoundaryRegistry>
  )
}
