import type {
  PageObjectResponse,
  PersonUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { FetchGetSeriesItemSearchParams } from 'app/api/blog/series/[slug]/types';
import type { FetchGetSeriesSearchParams } from 'app/api/blog/series/types';
import type { ExtendedRecordMap } from 'notion-types';
import { TEMP_FIXED_APP_LOCALE } from '../(constants)';
import type { AppLocale } from '../(types)/i18n';
import { SeriesItemSchema } from '../(types)/series';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://coldsurf.io';

export const fetchGetSeries = async (params: FetchGetSeriesSearchParams) => {
  try {
    const { seriesCategory, tag } = params;
    let url = `${BASE_URL}/api/blog/series?seriesCategory=${seriesCategory}&appLocale=${TEMP_FIXED_APP_LOCALE}`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    const response = await fetch(url, {
      method: 'GET',
    });
    const json = await response.json();
    const validation = SeriesItemSchema.array().safeParse(json);
    if (!validation.success) {
      console.error('fetch error, fetchGetSeries', params, validation.error);
      return [];
    }
    return validation.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const fetchGetSeriesItem = async (
  slug: string,
  searchParams: FetchGetSeriesItemSearchParams
) => {
  const { seriesCategory } = searchParams;

  const url = `${BASE_URL}/api/blog/series/${slug}?seriesCategory=${seriesCategory}&appLocale=${TEMP_FIXED_APP_LOCALE}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  if (!response.ok) {
    console.error(response.status);
    throw Error('fetchGetSeriesItem error');
  }
  const json = await response.json();
  return json as {
    page: PageObjectResponse;
    recordMap: ExtendedRecordMap;
  };
};

export const fetchGetLogDetail = async (
  slug: string,
  filters: { platform: string; locale: AppLocale }
) => {
  try {
    const { platform } = filters;
    const response = await fetch(
      `${BASE_URL}/api/blog/logs/${slug}?platform=${platform}&locale=${TEMP_FIXED_APP_LOCALE}`,
      {
        method: 'GET',
      }
    );
    const json = (await response.json()) as {
      page: PageObjectResponse;
      blocks: never[];
      recordMap: ExtendedRecordMap;
    };

    return json;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const fetchGetUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/blog/users`, {
    method: 'GET',
  });
  const json = (await response.json()) as {
    users: PersonUserObjectResponse[];
  };
  return json;
};

export const fetchGetResume = async (_filters: { locale: AppLocale }) => {
  const response = await fetch(`${BASE_URL}/api/blog/resume?locale=${TEMP_FIXED_APP_LOCALE}`, {
    method: 'GET',
  });
  const json = (await response.json()) as {
    blocks: {
      career: never[];
      side: never[];
    };
  };
  return json;
};

export const fetchGetTags = async () => {
  const response = await fetch(`${BASE_URL}/api/blog/tags`, {
    method: 'GET',
  });
  const json = (await response.json()) as {
    tags: {
      id: string;
      name: string;
      color: string;
    }[];
  };
  return json;
};
