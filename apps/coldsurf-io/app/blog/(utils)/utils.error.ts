import { captureException } from '@sentry/nextjs';
import { match } from 'ts-pattern';

type ThrowErrorParams = {
  type: 'invalid-series-category';
  seriesCategory: string;
};

export const createBlogError = (
  params: ThrowErrorParams,
  {
    withSentryCapture = false,
  }: {
    withSentryCapture?: boolean;
  }
) => {
  const error = match(params.type)
    .with('invalid-series-category', () => {
      return new Error(`invalid series category: ${params.seriesCategory}`);
    })
    .exhaustive();

  if (withSentryCapture) {
    captureException(error);
  }

  return error;
};
