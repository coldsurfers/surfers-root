'use client'

import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { UnknownError } from '../unknown-error'

export const GlobalErrorBoundaryRegistry = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => {
        return <UnknownError onClickRetry={resetErrorBoundary} />
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
