import { Client } from '@notionhq/client'

const notionInstance = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const notionDatabaseIds = {
  resume: process.env.NOTION_RESUME_DATABASE_ID,
  blog: process.env.NOTION_BLOG_DATABASE_ID,
}

export default notionInstance
