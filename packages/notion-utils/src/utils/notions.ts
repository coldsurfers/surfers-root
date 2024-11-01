/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadCloudinary } from '@coldsurfers/cloudinary-utils'
import { getRandomInt } from '@coldsurfers/shared-utils'
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { notionInstance } from '..'

const databaseId = process.env.NOTION_DATABASE_ID ?? ''

export const queryList = async ({
  platform,
  direction,
  timestamp,
}: {
  platform: 'surflog' | 'techlog' | 'store'
  direction: 'ascending' | 'descending'
  timestamp: 'created_time' | 'last_edited_time'
}) => {
  const platformFilter = {
    property: 'platform',
    multi_select: {
      contains: platform,
    },
  }
  const res = await notionInstance.databases.query({
    database_id: databaseId,
    sorts: [
      {
        timestamp,
        direction,
      },
    ],
    filter: platformFilter,
  })
  return res.results
}

export const queryDetail = async (filter: QueryDatabaseParameters['filter']) => {
  const res = await notionInstance.databases.query({
    database_id: databaseId,
    filter,
  })
  if (res.results.length) {
    return res.results[0]
  }
  return null
}

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
    if (process.env.NODE_ENV === 'production' && generated.type === 'image' && withUploadCloudinary) {
      if (generated.image.type === 'file') {
        const cloudinary = await uploadCloudinary(generated.image.file.url)
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

export const retrievePage = async (pageId: string) => {
  const response = await notionInstance.pages.retrieve({ page_id: pageId })
  return response
}
