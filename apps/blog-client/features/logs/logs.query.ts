import notionInstance, { notionDatabaseIds } from '@/lib/notionInstance'
import { PageObjectResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'
import { LogItem } from './types'
import { LogPlatform } from './types/platform'

export const queryLogDetail = (platform: LogPlatform) =>
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

export const queryTechlogDetail = queryLogDetail('techlog')
export const querySurflogDetail = queryLogDetail('surflog')
export const queryFilmlogDetail = queryLogDetail('filmlog')
export const querySoundlogDetail = queryLogDetail('soundlog')
export const querySquarelogDetail = queryLogDetail('squarelog')
export const queryTextlogDetail = queryLogDetail('textlog')

export const queryLogs = cache(
  async (
    platform: LogPlatform,
    lang: 'ko' | 'en',
    options?: {
      tag?: string
    },
  ): Promise<LogItem[]> => {
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

    const logs = result?.results?.map((post) => {
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

    return logs satisfies LogItem[]
  },
)
