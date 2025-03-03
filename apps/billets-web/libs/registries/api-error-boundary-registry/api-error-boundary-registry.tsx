'use client'

import { OpenApiError } from '@coldsurfers/api-sdk'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { NetworkError } from 'app/(ui)'
import { PropsWithChildren } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const fallbackRender = ({ resetErrorBoundary, error }: FallbackProps) => {
  if (error instanceof OpenApiError) {
    return <NetworkError onClickRetry={resetErrorBoundary} />
  }
  throw error
}

export const ApiErrorBoundaryRegistry = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
