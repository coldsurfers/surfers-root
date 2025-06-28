'use client';

import { UnknownError } from 'app/(ui)';
import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const GlobalErrorBoundaryRegistry = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => {
        return <UnknownError onClickRetry={resetErrorBoundary} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
