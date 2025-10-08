import { captureException } from '@sentry/nextjs';
import { match } from 'ts-pattern';
import type { SeriesCategory } from '../(types)/series';

export const generateSeriesHref = ({
  seriesCategory,
  query,
}: {
  seriesCategory?: SeriesCategory;
  query?: { page: number };
}): string => {
  let url = '';
  if (!seriesCategory) {
    url = '/blog';
  } else {
    url = `/blog/${seriesCategory}`;
  }

  if (query?.page) {
    return `${url}/page/${query.page}`;
  }

  return url;
};

export const generateSeriesItemHref = (seriesCategory: SeriesCategory, slug: string) => {
  return {
    pathname: `/blog/${seriesCategory}/${slug}`,
    params: {
      series: seriesCategory,
      slug,
    },
  };
};

export const convertSeriesCategoryToTitle = (seriesCategory: SeriesCategory) => {
  return match(seriesCategory)
    .with('catholic', () => 'YOU MUST PRAY THIS')
    .with('sound', () => 'YOU MUST LISTEN THIS')
    .with('tech', () => 'YOU MUST CODE THIS')
    .with('text', () => 'YOU MUST READ THIS')
    .with('video', () => 'YOU MUST WATCH THIS')
    .exhaustive();
};

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
