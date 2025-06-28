import { UnknownError } from '@/ui/unknown-error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const GlobalErrorBoundaryRegistry = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            FallbackComponent={({ resetErrorBoundary }) => {
              const onPressRetry = () => {
                reset();
                resetErrorBoundary();
              };
              return <UnknownError onPressRetry={onPressRetry} />;
            }}
          >
            {children}
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
};
