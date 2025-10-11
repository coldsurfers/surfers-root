import { getRandomInt } from '@coldsurfers/shared-utils';
import type {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';
import { match } from 'ts-pattern';
import type { AppLocale } from '../(types)/i18n';
import type { OfficialBlogSeriesCategory, SeriesCategory } from '../(types)/series';
import notionInstance, { notionDatabaseIds } from './notionInstance';

export const queryProperties = (propertyName: 'tags', isOfficialBlog?: boolean) =>
  cache(async () => {
    const filter: QueryDatabaseParameters['filter'] = {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
      ],
    };
    if (isOfficialBlog) {
      filter.and.push({
        property: 'platform',
        multi_select: {
          contains: 'official-blog',
        },
      });
      filter.and.push({
        property: 'OfficialBlogSeriesCategory',
        multi_select: {
          is_not_empty: true,
        },
      });
    } else {
      filter.and.push({
        property: 'SeriesCategory',
        multi_select: {
          is_not_empty: true,
        },
      });
    }
    const response = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
      filter,
    });
    return match(propertyName)
      .with('tags', () => {
        const tags = response.results
          .map((result) => {
            const page = result as PageObjectResponse;
            if (page.properties.tags.type === 'multi_select') {
              return page.properties.tags.multi_select;
            }
            return null;
          })
          .filter((value) => value !== null)
          .flat();
        // id 값으로  중복  제거
        return Array.from(new Map(tags.map((value) => [value.id, value])).values());
      })
      .exhaustive();
  });

export const getBlocks = async ({
  blockId: _blockId,
  withUploadCloudinary = false,
}: {
  blockId: string;
  withUploadCloudinary?: boolean;
}) => {
  const blockId = _blockId.replaceAll('-', '');

  let next: string | undefined = '';
  const list: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
  while (typeof next === 'string') {
    const { results, has_more, next_cursor } = await notionInstance.blocks.children.list({
      block_id: blockId,
      start_cursor: next || undefined,
    });
    if (has_more && next_cursor) {
      next = next_cursor;
    } else {
      next = undefined;
    }
    list.push(...results);
  }

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = list.map(async (block) => {
    const generated = {
      ...block,
    } as BlockObjectResponse & {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      children: any;
    };
    if (generated.has_children) {
      const children = await getBlocks({
        blockId: block.id,
        withUploadCloudinary,
      });
      generated.children = children;
    }
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window === 'undefined' &&
      generated.type === 'image' &&
      withUploadCloudinary
    ) {
      if (generated.image.type === 'file') {
        const cloudinaryUtils = await import('@coldsurfers/cloudinary-utils');
        const cloudinary = await cloudinaryUtils.uploadCloudinary(generated.image.file.url);
        generated.image.file.url = cloudinary.secure_url;
      }
    }
    return generated;
  });

  return Promise.all(childBlocks).then((blocks) =>
    blocks.reduce((acc, curr) => {
      if (curr.type === 'bulleted_list_item') {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        if ((acc[acc.length - 1] as any)?.type === 'bulleted_list') {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (acc[acc.length - 1][(acc[acc.length - 1] as any).type] as any).children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'bulleted_list',
            bulleted_list: { children: [curr] },
          } as never);
        }
      } else if (curr.type === 'numbered_list_item') {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        if ((acc[acc.length - 1] as any)?.type === 'numbered_list') {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (acc[acc.length - 1][(acc[acc.length - 1] as any).type] as any).children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'numbered_list',
            numbered_list: { children: [curr] },
          } as never);
        }
      } else {
        acc.push(curr as never);
      }
      return acc;
    }, [])
  );
};

function parseSeriesItems(result: QueryDatabaseResponse) {
  const seriesItems = result?.results?.map((post) => {
    const createdTime = (() => {
      const _post = post as PageObjectResponse;
      const pubDate = _post.properties?.['Publish date'];
      if (pubDate.type === 'date') {
        return pubDate.date?.start ? new Date(pubDate.date?.start) : null;
      }
      return null;
    })();
    const lastEditedTime = (() => {
      const _post = post as PageObjectResponse;
      return new Date(_post.last_edited_time);
    })();
    const slug = (() => {
      const _post = post as PageObjectResponse;
      const _slug = _post.properties.Slug;
      if (_slug.type !== 'rich_text') {
        return '';
      }
      const richText = _slug.rich_text.at(0);
      if (!richText) {
        return '';
      }
      return richText.type === 'text' ? richText.text.content : '';
    })();
    const title = (() => {
      const _post = post as PageObjectResponse;
      return _post.properties?.Name?.type === 'title' ? _post.properties.Name.title : null;
    })();
    const postStatus = (() => {
      const _post = post as PageObjectResponse;
      const status = _post.properties.Status;
      if (status.type !== 'status') {
        return '';
      }
      return status.status?.name;
    })();
    const lang = (() => {
      const _post = post as PageObjectResponse;
      const _lang = _post.properties.lang;
      if (_lang.type !== 'multi_select') {
        return null;
      }
      return _lang.multi_select.at(0)?.name;
    })();
    const writer = (() => {
      const _post = post as PageObjectResponse;
      const people = _post.properties.Writer;
      if (people.type !== 'people') {
        return null;
      }
      return people.people.at(0);
    })();
    const thumbnailUrl = (() => {
      const _post = post as PageObjectResponse;
      const thumb = _post.properties.thumb;
      if (thumb.type !== 'url') {
        return null;
      }
      return thumb.url;
    })();
    const seriesCategory = (() => {
      const _post = post as PageObjectResponse;
      const _seriesCategory = _post.properties.SeriesCategory;
      if (_seriesCategory.type !== 'multi_select') {
        return null;
      }
      return _seriesCategory.multi_select.at(0)?.name;
    })();
    const officialBlogSeriesCategory = (() => {
      const _post = post as PageObjectResponse;
      const _officialBlogSeriesCategory = _post.properties.OfficialBlogSeriesCategory;
      if (_officialBlogSeriesCategory.type !== 'multi_select') {
        return null;
      }
      return _officialBlogSeriesCategory.multi_select.at(0)?.name;
    })();
    return {
      id: post.id,
      createdTime,
      lastEditedTime,
      dateLocale: createdTime?.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      slug,
      title,
      status: postStatus,
      writer,
      lang,
      seriesCategory,
      officialBlogSeriesCategory,
      thumbnailUrl,
    };
  });

  return seriesItems;
}

export const queryAllSeries = cache(
  async ({ lang, isOfficialBlog }: { lang: AppLocale; isOfficialBlog?: boolean }) => {
    const filter: QueryDatabaseParameters['filter'] = {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'lang',
          multi_select: {
            contains: lang,
          },
        },
      ],
    };

    if (isOfficialBlog) {
      filter.and.push({
        property: 'platform',
        multi_select: {
          contains: 'official-blog',
        },
      });
      filter.and.push({
        property: 'OfficialBlogSeriesCategory',
        multi_select: {
          is_not_empty: true,
        },
      });
    } else {
      filter.and.push({
        property: 'SeriesCategory',
        multi_select: {
          is_not_empty: true,
        },
      });
    }

    const result = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
      sorts: [
        {
          property: 'Publish date',
          direction: 'descending',
        },
      ],
      filter,
    });
    return parseSeriesItems(result);
  }
);

export const querySeries = cache(
  async ({
    seriesCategory,
    lang,
    tag,
    isOfficialBlog,
  }:
    | {
        isOfficialBlog: false;
        seriesCategory: SeriesCategory;
        lang: AppLocale;
        tag?: string;
      }
    | {
        isOfficialBlog: true;
        seriesCategory: OfficialBlogSeriesCategory;
        lang: AppLocale;
        tag?: string;
      }) => {
    const filter: QueryDatabaseParameters['filter'] = {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'lang',
          multi_select: {
            contains: lang,
          },
        },
      ],
    };
    if (tag) {
      filter.and.push({
        property: 'tags',
        multi_select: {
          contains: tag,
        },
      });
    }
    if (isOfficialBlog) {
      filter.and.push({
        property: 'platform',
        multi_select: {
          contains: 'official-blog',
        },
      });
      filter.and.push({
        property: 'OfficialBlogSeriesCategory',
        multi_select: {
          contains: seriesCategory,
        },
      });
    } else {
      filter.and.push({
        property: 'SeriesCategory',
        multi_select: {
          contains: seriesCategory,
        },
      });
    }
    const result = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
      sorts: [
        {
          property: 'Publish date',
          direction: 'descending',
        },
      ],
      filter,
    });
    return parseSeriesItems(result);
  }
);

export const querySeriesItem = cache(
  async ({
    slug,
    lang,
    seriesCategory,
    isOfficialBlog,
  }:
    | {
        slug: string;
        lang: AppLocale;
        seriesCategory: OfficialBlogSeriesCategory;
        isOfficialBlog: true;
      }
    | {
        isOfficialBlog: false;
        seriesCategory: SeriesCategory;
        lang: AppLocale;
        slug: string;
      }) => {
    const filter: QueryDatabaseParameters['filter'] = {
      and: [
        {
          property: 'Slug',
          formula: {
            string: {
              equals: slug,
            },
          },
        },
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'lang',
          multi_select: {
            contains: lang,
          },
        },
      ],
    };
    if (isOfficialBlog) {
      filter.and.push({
        property: 'platform',
        multi_select: {
          contains: 'official-blog',
        },
      });
      filter.and.push({
        property: 'OfficialBlogSeriesCategory',
        multi_select: {
          contains: seriesCategory,
        },
      });
    } else {
      filter.and.push({
        property: 'SeriesCategory',
        multi_select: {
          contains: seriesCategory,
        },
      });
    }
    const res = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
      filter,
    });
    if (res.results.length) {
      return res.results[0] as PageObjectResponse;
    }
    return null;
  }
);

export const queryTags = queryProperties('tags', false);
