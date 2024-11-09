import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'
import { match } from 'ts-pattern'
import notionInstance, { notionDatabaseIds } from '../notionInstance'

const getLogDetail = (platform: 'techlog' | 'surflog') =>
  cache(async ({ slug, lang }: { slug: string; lang: 'ko' | 'en' }): Promise<PageObjectResponse | null> => {
    const res = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
      filter: {
        and: [
          {
            property: 'Slug',
            formula: {
              string: {
                equals: slug,
              },
            },
          },
          {
            property: 'Status',
            status: {
              equals: 'Published',
            },
          },
          {
            property: 'platform',
            multi_select: {
              contains: platform,
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
    if (res.results.length) {
      return res.results[0] as PageObjectResponse
    }
    return null
  })

export const getTechlogDetail = getLogDetail('techlog')
export const getSurflogDetail = getLogDetail('surflog')

export const queryLogs = cache(async (platform: 'techlog' | 'surflog', lang: 'ko' | 'en') => {
  const result = await notionInstance.databases.query({
    database_id: notionDatabaseIds.blog ?? '',
    sorts: [
      {
        property: 'Publish date',
        direction: 'descending',
      },
    ],
    filter: {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'platform',
          multi_select: {
            contains: platform,
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

  const posts = result?.results?.map((post) => {
    // @ts-ignore
    const createdTime = new Date(post.properties?.['Publish date']?.date?.start ?? post.created_time)
    // @ts-ignore
    const lastEditedTime = new Date(post.last_edited_time)
    // @ts-ignore
    const slug = post.properties?.Slug?.rich_text?.at(0)?.text.content
    // @ts-ignore
    const title = post.properties?.Name?.title
    // @ts-ignore
    const postStatus = post.properties.Status.status.name
    // @ts-ignore
    const writer = post.properties?.Writer.people.at(0) ?? null
    return {
      id: post.id,
      createdTime,
      lastEditedTime,
      dateLocale: createdTime.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      slug,
      title,
      status: postStatus,
      writer,
      lang,
    }
  })

  return posts
})

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
        return tags
      })
      .exhaustive()
  })

export const getTags = queryProperties('tags')

export const generatePDF = async () => {
  // Set options for html2pdf
  const options = {
    margin: 0.25,
    filename: 'website_screenshot.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1.5 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' },
  }

  // Select the element to capture
  const element = document.body

  // @ts-expect-error
  const { default: html2pdf } = await import('html2pdf.js')
  // Generate PDF
  html2pdf()
    .from(element)
    .set({
      ...options,
    })
    .save()
}
