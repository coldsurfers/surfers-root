import { getTags, queryLogs } from '@/lib/utils'
import { getPathname, routing } from 'i18n/routing'
import { MetadataRoute } from 'next'

// Adapt this as necessary
const host = 'https://blog.coldsurf.io'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = routing.locales.map((locale) => ({ locale }))
  const surflogPromises = locales.map(async (locale) => await queryLogs('surflog', locale.locale))
  const surflogSlugs = (await Promise.all(surflogPromises)).flat().map((value) => ({ slug: value.slug }))
  const techlogPromises = locales.map(async (locale) => await queryLogs('techlog', locale.locale))
  const techlogSlugs = (await Promise.all(techlogPromises)).flat().map((value) => ({ slug: value.slug }))
  const allTags = await getTags()
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

  // Adapt this as necessary
  return [
    getEntry('/'),
    getEntry('/surflog'),
    getEntry('/techlog'),
    ...surflogSlugs.map(({ slug }) => {
      return getEntry({
        pathname: '/surflog/[slug]',
        params: {
          slug,
        },
      })
    }),
    ...techlogSlugs.map(({ slug }) => {
      return getEntry({
        pathname: '/techlog/[slug]',
        params: {
          slug,
        },
      })
    }),
    getEntry('/tags'),
    ...allTagsByLocales.map(({ tag }) => {
      return getEntry({
        pathname: '/tags/[tag]',
        params: {
          tag,
        },
      })
    }),
  ]
}

type Href = Parameters<typeof getPathname>[0]['href']

function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, getUrl(href, locale)])),
    },
  }
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href })
  return host + pathname
}
