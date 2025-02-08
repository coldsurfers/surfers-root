/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppLocale } from '@/lib/types/i18n'
import { Series, SeriesItemSchema } from '@/lib/types/series'
import { getRandomInt } from '@coldsurfers/shared-utils'
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'
import { match } from 'ts-pattern'
import notionInstance, { notionDatabaseIds } from '../../../lib/notionInstance'

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

export const getBlocks = async ({
  blockId: _blockId,
  withUploadCloudinary = false,
}: {
  blockId: string
  withUploadCloudinary?: boolean
}) => {
  const blockId = _blockId.replaceAll('-', '')

  let next: string | undefined = ''
  const list: (BlockObjectResponse | PartialBlockObjectResponse)[] = []
  while (typeof next === 'string') {
    const { results, has_more, next_cursor } = await notionInstance.blocks.children.list({
      block_id: blockId,
      start_cursor: next || undefined,
    })
    if (has_more && next_cursor) {
      next = next_cursor
    } else {
      next = undefined
    }
    list.push(...results)
  }

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = list.map(async (block) => {
    const generated = {
      ...block,
    } as BlockObjectResponse & {
      children: any
    }
    if (generated.has_children) {
      const children = await getBlocks({
        blockId: block.id,
        withUploadCloudinary,
      })
      generated.children = children
    }
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window === 'undefined' &&
      generated.type === 'image' &&
      withUploadCloudinary
    ) {
      if (generated.image.type === 'file') {
        const cloudinaryUtils = await import('@coldsurfers/cloudinary-utils')
        const cloudinary = await cloudinaryUtils.uploadCloudinary(generated.image.file.url)
        generated.image.file.url = cloudinary.secure_url
      }
    }
    return generated
  })

  return Promise.all(childBlocks).then((blocks) =>
    blocks.reduce((acc, curr) => {
      if (curr.type === 'bulleted_list_item') {
        if ((acc[acc.length - 1] as any)?.type === 'bulleted_list') {
          ;(acc[acc.length - 1][(acc[acc.length - 1] as any).type] as any).children?.push(curr)
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'bulleted_list',
            bulleted_list: { children: [curr] },
          } as never)
        }
      } else if (curr.type === 'numbered_list_item') {
        if ((acc[acc.length - 1] as any)?.type === 'numbered_list') {
          ;(acc[acc.length - 1][(acc[acc.length - 1] as any).type] as any).children?.push(curr)
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'numbered_list',
            numbered_list: { children: [curr] },
          } as never)
        }
      } else {
        acc.push(curr as never)
      }
      return acc
    }, []),
  )
}

export const querySeries = cache(async ({ series, lang, tag }: { series: Series; lang: AppLocale; tag?: string }) => {
  const filter: QueryDatabaseParameters['filter'] = {
    and: [
      {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      },
      {
        property: 'category',
        multi_select: {
          contains: series,
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
  if (tag) {
    filter.and.push({
      property: 'tags',
      multi_select: {
        contains: tag,
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
    // @ts-ignore
    const thumbnailUrl = post.properties?.thumb?.url ?? null
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
      series,
      thumbnailUrl,
    }
  })

  const validation = SeriesItemSchema.array().safeParse(logs)
  if (!validation.success) {
    return []
  }

  return validation.data
})
