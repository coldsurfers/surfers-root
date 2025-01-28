'use client'

import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { NetworkError } from 'app/(ui)'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const ApiErrorBoundaryRegistry = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => <NetworkError onClickRetry={resetErrorBoundary} />}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
