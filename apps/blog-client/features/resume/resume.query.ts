import notionInstance, { notionDatabaseIds } from '@/lib/notionInstance'
import { AppLocale } from 'i18n/types'
import { cache } from 'react'

export const queryResumePage = cache(
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
