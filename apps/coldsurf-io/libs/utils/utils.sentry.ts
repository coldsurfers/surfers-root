import type { captureException as captureServerException } from '@sentry/nextjs';
import type { captureException as captureClientException } from '@sentry/react';

let captureException: typeof captureServerException | typeof captureClientException;

if (typeof window === 'undefined') {
  captureException = require('@sentry/nextjs').captureException;
} else {
  captureException = require('@sentry/react').captureException;
}

export { captureException };
