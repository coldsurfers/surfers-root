import { AppLocale } from 'i18n/types'
import { cache } from 'react'
import notionInstance, { notionDatabaseIds } from '../../../lib/notionInstance'

export const queryNotionResumePage = cache(
  async (tagName: 'Career' | 'Side Project Career' | 'Music Career', lang: AppLocale) => {
    const res = await notionInstance.databases.query({
      database_id: notionDatabaseIds.resume ?? '',
      filter: {
        and: [
          {
            property: 'Tags',
            multi_select: {
              contains: tagName,
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
    return res
  },
)
