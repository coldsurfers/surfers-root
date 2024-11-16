import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
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
