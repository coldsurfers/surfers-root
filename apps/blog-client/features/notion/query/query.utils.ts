import { LogPlatform } from '@/features/logs'
import { PageObjectResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'
import { match } from 'ts-pattern'
import notionInstance, { notionDatabaseIds } from '../../../lib/notionInstance'

export const getLogDetail = (platform: LogPlatform) =>
  cache(async ({ slug, lang }: { slug: string; lang: 'ko' | 'en' }): Promise<PageObjectResponse | null> => {
    const res = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
      filter: {
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
            property: 'platform',
            multi_select: {
              contains: platform,
            },
          },
          {
            property: 'lang',
            multi_select: {
              contains: lang,
            },
          },
        ],
      },
    })
    if (res.results.length) {
      return res.results[0] as PageObjectResponse
    }
    return null
  })

export const queryLogs = cache(
  async (
    platform: 'techlog' | 'surflog',
    lang: 'ko' | 'en',
    options?: {
      tag?: string
    },
  ) => {
    const filter: QueryDatabaseParameters['filter'] = {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'platform',
          multi_select: {
            contains: platform,
          },
        },
        {
          property: 'lang',
          multi_select: {
            contains: lang,
          },
        },
      ],
    }
    if (options?.tag) {
      filter.and.push({
        property: 'tags',
        multi_select: {
          contains: options.tag,
        },
      })
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
    })

    const posts = result?.results?.map((post) => {
      // @ts-ignore
      const createdTime = new Date(post.properties?.['Publish date']?.date?.start ?? post.created_time)
      // @ts-ignore
      const lastEditedTime = new Date(post.last_edited_time)
      // @ts-ignore
      const slug = post.properties?.Slug?.rich_text?.at(0)?.text.content
      // @ts-ignore
      const title = post.properties?.Name?.title
      // @ts-ignore
      const postStatus = post.properties.Status.status.name
      // @ts-ignore
      const writer = post.properties?.Writer.people.at(0) ?? null
      return {
        id: post.id,
        createdTime,
        lastEditedTime,
        dateLocale: createdTime.toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        slug,
        title,
        status: postStatus,
        writer,
        lang,
        platform,
      }
    })

    return posts
  },
)

export const queryProperties = (propertyName: 'tags') =>
  cache(async () => {
    const response = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
    })
    return match(propertyName)
      .with('tags', () => {
        const tags = response.results
          .map((result) => {
            const page = result as PageObjectResponse
            if (page.properties.tags.type === 'multi_select') {
              return page.properties.tags.multi_select
            }
            return null
          })
          .filter((value) => value !== null)
          .flat()
        // id 값으로  중복  제거
        return Array.from(new Map(tags.map((value) => [value.id, value])).values())
      })
      .exhaustive()
  })
