import type {
  PageObjectResponse,
  PersonUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { FetchGetSeriesItemSearchParams } from 'app/api/blog/series/[slug]/types';
import type { FetchGetSeriesSearchParams } from 'app/api/blog/series/types';
import type { ExtendedRecordMap } from 'notion-types';
import { cache } from 'react';
import {
  ALL_SERIES_CATEGORIES,
  ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG,
  PAGINATION_PER_PAGE,
  TEMP_FIXED_APP_LOCALE,
} from '../(constants)';
import type { AppLocale } from '../(types)/i18n';
import { type SeriesItem, SeriesItemSchema } from '../(types)/series';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://coldsurf.io';

export const fetchGetSeries = cache(
  async (
    params: FetchGetSeriesSearchParams
  ): Promise<{
    postItems: SeriesItem[];
    totalPage: number;
  }> => {
    try {
      const { seriesCategory, tag, isOfficialBlog } = params;
      const searchParams = new URLSearchParams();
      searchParams.set('seriesCategory', seriesCategory);
      searchParams.set('appLocale', TEMP_FIXED_APP_LOCALE);
      if (tag) {
        searchParams.set('tag', tag);
      }
      if (isOfficialBlog) {
        searchParams.set('isOfficialBlog', 'true');
      }
      const url = `${BASE_URL}/api/blog/series?${searchParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
      });
      const json = await response.json();
      const validation = SeriesItemSchema.array().safeParse(json);
      if (!validation.success) {
        console.error('fetch error, fetchGetSeries', params, validation.error);
        return {
          postItems: [],
          totalPage: 0,
        };
      }
      const { data } = validation;
      return {
        postItems: data.sort(
          (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
        ),
        totalPage: Math.ceil(data.length / PAGINATION_PER_PAGE),
      };
    } catch (e) {
      console.error(e);
      return {
        postItems: [],
        totalPage: 0,
      };
    }
  }
);

export const fetchGetSeriesItem = async (
  slug: string,
  searchParams: FetchGetSeriesItemSearchParams
) => {
  const { seriesCategory, appLocale, isOfficialBlog } = searchParams;

  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('seriesCategory', seriesCategory);
  urlSearchParams.set('appLocale', appLocale);
  urlSearchParams.set('isOfficialBlog', isOfficialBlog ? 'true' : 'false');
  const url = `${BASE_URL}/api/blog/series/${slug}?${urlSearchParams.toString()}`;
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

export const fetchGetTags = cache(async ({ isOfficialBlog }: { isOfficialBlog?: boolean }) => {
  const response = await fetch(`${BASE_URL}/api/blog/tags?isOfficialBlog=${isOfficialBlog}`, {
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
});

export const fetchGetSeriesListAllStatic = cache(
  async ({ tag, isOfficialBlog }: { tag?: string; isOfficialBlog?: boolean }) => {
    const promises = isOfficialBlog
      ? ALL_SERIES_CATEGORIES_WITH_OFFICIAL_BLOG.map(async (seriesCategory) => {
          return await fetchGetSeries({
            seriesCategory,
            appLocale: 'ko',
            tag,
            isOfficialBlog: true,
          });
        })
      : ALL_SERIES_CATEGORIES.map(async (seriesCategory) => {
          return await fetchGetSeries({
            seriesCategory,
            appLocale: 'ko',
            tag,
            isOfficialBlog: false,
          });
        });
    const response = await Promise.all(promises);
    const allPostItems = response
      .flatMap((value) => value.postItems)
      .filter((value) => value !== null)
      .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
    return {
      allPostItems,
      totalPage: Math.ceil(allPostItems.length / PAGINATION_PER_PAGE),
    };
  }
);
