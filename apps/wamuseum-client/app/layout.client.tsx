'use client'

import Header from '@/ui/Header'
import { ApolloHydrationBoundary } from 'libs'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import ApolloProviderRegistry from './registry/ApolloProviderRegistry'

export const RootLayoutClient = ({
  children,
  initialState,
}: PropsWithChildren<{
  initialState?: object
  token?: string
}>) => {
  const pathname = usePathname()
  return (
    <ApolloProviderRegistry>
      <ApolloHydrationBoundary initialState={initialState}>
        {pathname?.includes('/auth') ? null : <Header />}
        {children}
      </ApolloHydrationBoundary>
    </ApolloProviderRegistry>
  )
}
