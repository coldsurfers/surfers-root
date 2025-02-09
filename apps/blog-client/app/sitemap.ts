import { queryAllSeries, queryTags } from '@/features'
import { ALL_SERIES_CATEGORIES } from '@/lib/constants'
import { getPathname, routing } from 'i18n/routing'
import { MetadataRoute } from 'next'

// Adapt this as necessary
const host = 'https://blog.coldsurf.io'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = routing.locales.map((locale) => ({ locale }))
  const allSeriesItemsPromises = locales.map(
    async (locale) =>
      await queryAllSeries({
        lang: locale.locale,
      }),
  )
  const allSeriesItemsValues = (await Promise.all(allSeriesItemsPromises))
    .flat()
    .map((value) => ({ slug: value.slug, seriesCategory: value.seriesCategory, lastModified: value.lastEditedTime }))
  const allTags = await queryTags()
  const allTagsByLocales = locales
    .map((locale) => {
      return allTags.map((tag) => {
        return {
          tag: tag.name,
          locale: locale.locale,
        }
      })
    })
    .flat()

  const allSeriesEntry = ALL_SERIES_CATEGORIES.map((series) => {
    return getEntry(
      {
        pathname: '/[series]',
        params: {
          series,
        },
      },
      new Date(),
    )
  })
  const allSeriesItemsEntry = allSeriesItemsValues.map(({ slug, seriesCategory, lastModified }) => {
    return getEntry(
      {
        pathname: '/[series]/[slug]',
        params: {
          series: seriesCategory ?? '',
          slug,
        },
      },
      lastModified,
    )
  })
  const allTagsEntry = allTagsByLocales.map(({ tag }) => {
    return getEntry(
      {
        pathname: '/tags/[tag]',
        params: {
          tag,
        },
      },
      new Date(),
    )
  })

  // Adapt this as necessary
  return [
    getEntry('/', new Date()),
    ...allSeriesEntry,
    ...allSeriesItemsEntry,
    getEntry('/tags', new Date()),
    ...allTagsEntry,
  ]
}

type Href = Parameters<typeof getPathname>[0]['href']

function getEntry(href: Href, lastModified: Date): MetadataRoute.Sitemap[number] {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, getUrl(href, locale)])),
    },
  }
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href })
  return encodeURI(host + pathname)
}
