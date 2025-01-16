import { APP_STORE_URL, SITE_URL } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren, ReactNode } from 'react'
import { Navigation } from './(components)'

async function LayoutInner({ city, children }: PropsWithChildren<{ city: string }>) {
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.location.queryKeys.country.list,
      queryFn: () => apiClient.location.getCountries(),
    })
  } catch (e) {
    console.error(e)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navigation initialCity={city} />
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'Brand',
              image: `${SITE_URL}/favicon.ico`,
              logo: `${SITE_URL}/favicon.ico`,
              url: SITE_URL,
              name: 'Billets',
              sameAs: [APP_STORE_URL, 'https://coldsurf.io', 'https://blog.coldsurf.io'],
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'WebSite',
              url: SITE_URL,
              name: 'Billets',
            }),
          ),
        }}
      />
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
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.location.queryKeys.country.list,
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
