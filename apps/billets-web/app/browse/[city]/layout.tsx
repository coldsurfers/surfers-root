import { initialPageQuery } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren, ReactNode } from 'react'
import { Navigation } from './(components)'

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

export default async function BrowseByCityLayout({
  children,
  params,
}: {
  children: ReactNode
  params: {
    city: string
  }
}) {
  return (
    <ApiErrorBoundaryRegistry>
      <LayoutInner city={params.city}>{children}</LayoutInner>
    </ApiErrorBoundaryRegistry>
  )
}
