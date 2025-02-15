import { COMMON_META_DESCRIPTION, COMMON_META_TITLE } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { initialPageQuery } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient, validateCityParam } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next/types'
import { PropsWithChildren, ReactNode } from 'react'
import { Navigation } from './(components)'

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

async function LayoutInner({ city, children }: PropsWithChildren<{ city: string }>) {
  const queryClient = getQueryClient()

  await Promise.all([
    await queryClient.prefetchQuery(initialPageQuery.getCountries()),
    await queryClient.prefetchQuery(initialPageQuery.eventCategories()),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navigation initialCity={city} />
      {children}
    </HydrationBoundary>
  )
}

export default async function BrowseByCityLayout(props: {
  children: ReactNode
  params: Promise<{
    city: string
  }>
}) {
  const params = await props.params

  const { children } = props

  return (
    <ApiErrorBoundaryRegistry>
      <LayoutInner city={params.city}>{children}</LayoutInner>
    </ApiErrorBoundaryRegistry>
  )
}
