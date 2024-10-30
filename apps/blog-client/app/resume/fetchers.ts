import { cache } from 'react'
import notionInstance, { notionDatabaseIds } from '../../lib/notionInstance'

export const queryNotionResumePage = cache(async (tagName: 'Career' | 'Side Project Career' | 'Music Career') => {
  const res = await notionInstance.databases.query({
    database_id: notionDatabaseIds.resume ?? '',
    filter: {
      property: 'Tags',
      multi_select: {
        contains: tagName,
      },
    },
  })
  return res
})
