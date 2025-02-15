import { COMMON_META_DESCRIPTION, COMMON_META_TITLE, SITE_NAME, SITE_URL } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata/metadata-instance'
import { initialPageQuery } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { validateCityParam } from '@/libs/utils/utils.city'
import { getEventCategoryUIName, validateEventCategoryParam } from '@/libs/utils/utils.event-category'
import { getQueryClient } from '@/libs/utils/utils.query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { RouteLoading } from 'app/(ui)'
import { Metadata } from 'next/types'
import { ReactNode } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'city': string; 'event-category': string }>
}): Promise<Metadata> {
  const cityValidation = await validateCityParam((await params)['city'])
  if (!cityValidation.isValid) {
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
  const eventCategoryValidation = await validateEventCategoryParam((await params)['event-category'])
  if (!eventCategoryValidation.isValid) {
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
  const eventCategoryUIName = getEventCategoryUIName(eventCategoryValidation.data.name)
  const title = `${eventCategoryUIName} in ${cityValidation.data.uiName} | ${SITE_NAME}`
  const openGraph: Metadata['openGraph'] = {
    title,
    description: COMMON_META_DESCRIPTION,
    type: 'website',
  }
  return metadataInstance.generateMetadata<Metadata>({
    title,
    description: COMMON_META_DESCRIPTION,
    openGraph,
    keywords: [eventCategoryValidation.data.name, eventCategoryUIName, cityValidation.data.uiName],
    alternates: {
      canonical: `${SITE_URL}/browse/${cityValidation.data.name}/${eventCategoryValidation.data.name.toLowerCase()}`,
    },
  })
}

async function LayoutInner({
  children,
  eventCategory,
  city,
}: {
  children: ReactNode
  eventCategory: string
  city: string
}) {
  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery(
    initialPageQuery.browseEvents({ cityName: city, eventCategoryName: eventCategory.toLowerCase() }),
  )

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

export default async function BrowseByCityEventCategoryLayout(props: {
  children: ReactNode
  params: Promise<{ ['event-category']: string; city: string }>
}) {
  const params = await props.params

  const { children } = props

  const eventCategory = params['event-category']
  const city = params['city']
  return (
    <ApiErrorBoundaryRegistry>
      <RouteLoading>
        <LayoutInner eventCategory={eventCategory} city={city}>
          {children}
        </LayoutInner>
      </RouteLoading>
    </ApiErrorBoundaryRegistry>
  )
}
