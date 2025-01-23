'use client'

import { NetworkError } from 'app/(ui)'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const ApiErrorBoundaryRegistry = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => {
        return <NetworkError onClickRetry={resetErrorBoundary} />
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
