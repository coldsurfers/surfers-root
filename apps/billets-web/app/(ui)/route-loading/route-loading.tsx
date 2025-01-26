'use client'

import { Spinner } from '@coldsurfers/ocean-road'
import { PropsWithChildren, Suspense } from 'react'

export function RouteLoading({ children }: PropsWithChildren) {
  return <Suspense fallback={<Spinner variant="page-overlay" />}>{children}</Suspense>
}
