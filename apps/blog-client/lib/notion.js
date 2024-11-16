import { getBlocks as getBlocksNotion } from '@coldsurfers/notion-utils'
import { cache } from 'react'

export const revalidate = 3600 // revalidate the data at most every hour

export const databaseId = process.env.NOTION_BLOG_DATABASE_ID

export const getBlocks = cache(
  async (blockId) =>
    await getBlocksNotion({
      blockId,
      withUploadCloudinary: true,
    }),
)
