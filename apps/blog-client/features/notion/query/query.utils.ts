/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppLocale } from '@/lib/types/i18n'
import { Series } from '@/lib/types/series'
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

  const seriesItems = result?.results?.map((post) => {
    const createdTime = (() => {
      const _post = post as PageObjectResponse
      const pubDate = _post.properties?.['Publish date']
      if (pubDate.type === 'date') {
        return pubDate.date?.start ? new Date(pubDate.date?.start) : null
      }
      return null
    })()
    const lastEditedTime = (() => {
      const _post = post as PageObjectResponse
      return new Date(_post.last_edited_time)
    })()
    const slug = (() => {
      const _post = post as PageObjectResponse
      const _slug = _post.properties.Slug
      if (_slug.type !== 'rich_text') {
        return ''
      }
      const richText = _slug.rich_text.at(0)
      if (!richText) {
        return ''
      }
      return richText.type === 'text' ? richText.text.content : ''
    })()
    const title = (() => {
      const _post = post as PageObjectResponse
      return _post.properties?.Name?.type === 'title' ? _post.properties.Name.title : null
    })()
    const postStatus = (() => {
      const _post = post as PageObjectResponse
      const status = _post.properties.Status
      if (status.type !== 'status') {
        return ''
      }
      return status.status?.name
    })()
    const writer = (() => {
      const _post = post as PageObjectResponse
      const people = _post.properties.Writer
      if (people.type !== 'people') {
        return null
      }
      return people.people.at(0)
    })()
    const thumbnailUrl = (() => {
      const _post = post as PageObjectResponse
      const thumb = _post.properties.thumb
      if (thumb.type !== 'url') {
        return null
      }
      return thumb.url
    })()
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
      series,
      thumbnailUrl,
    }
  })

  return seriesItems
})
