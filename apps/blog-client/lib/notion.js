import { cache } from 'react'
import {
  queryDetail,
  queryList,
  retrievePage,
  getBlocks as getBlocksNotion,
} from '@coldsurfers/notion-utils'

export const revalidate = 3600 // revalidate the data at most every hour

export const databaseId = process.env.NOTION_BLOG_DATABASE_ID

export const getAllPosts = cache(
  async () =>
    await queryList({
      platform: 'techlog',
      direction: 'descending',
      timestamp: 'created_time',
    })
)

export const getPage = cache(async (pageId) => await retrievePage(pageId))

export const getPageFromSlug = cache(
  async (slug) =>
    await queryDetail({
      property: 'Slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    })
)

export const getBlocks = cache(
  async (blockId) =>
    await getBlocksNotion({
      blockId,
      withUploadCloudinary: true,
    })
)
