import { UnknownError } from '@/ui/unknown-error'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const GlobalErrorBoundaryRegistry = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            FallbackComponent={({ resetErrorBoundary }) => {
              return (
                <UnknownError
                  onPressRetry={() => {
                    reset()
                    resetErrorBoundary()
                  }}
                />
              )
            }}
          >
            {children}
          </ErrorBoundary>
        )
      }}
    </QueryErrorResetBoundary>
  )
}
