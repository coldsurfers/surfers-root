import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { PageProps } from 'types'
import { Navigation } from './(components)'

async function LayoutInner({ city, children }: PropsWithChildren<{ city: string }>) {
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.location.queryKeys.getCountries(),
      queryFn: () => apiClient.location.getCountries(),
    })
  } catch (e) {
    console.error(e)
  }

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
}: PropsWithChildren<
  PageProps<{
    city: string
  }>
>) {
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.location.queryKeys.getCountries(),
      queryFn: () => apiClient.location.getCountries(),
    })
  } catch (e) {
    console.error(e)
  }

  return (
    <ApiErrorBoundaryRegistry>
      <LayoutInner city={params.city}>{children}</LayoutInner>
    </ApiErrorBoundaryRegistry>
  )
}
