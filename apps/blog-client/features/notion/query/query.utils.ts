/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRandomInt } from '@coldsurfers/shared-utils'
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
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
    if (process.env.NODE_ENV === 'production' && generated.type === 'image' && withUploadCloudinary) {
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
