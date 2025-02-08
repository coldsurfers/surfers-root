import { NextMetadataGenerator } from '@coldsurfers/shared-utils'
import { PageObjectResponse, UserObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { routing } from 'i18n/routing'
import { Metadata } from 'next/types'
import { SITE_URL } from '../constants'
import { SeriesCategory } from '../types/series'

export const metadataInstance = new NextMetadataGenerator({
  baseData: {
    keywords: [
      'COLDSURF',
      'ColdSurf',
      'coldsurf',
      'Billets',
      'Blog',
      'Articles',
      'Corporate Blog',
      'Development',
      'Software Development',
      'Film',
      'Culture',
      'Books',
    ],
    icons: {
      icon: '/icons/favicon.ico',
      shortcut: '/icons/favicon.ico',
      apple: '/icons/favicon.ico',
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      siteName: 'COLDSURF Blog',
    },
  },
})

export const generateLogDetailMetadata = (
  page: PageObjectResponse | null,
  options: {
    locale: (typeof routing.locales)[number]
    slug: string
    seriesCategory: SeriesCategory
  },
) => {
  if (!page) {
    return {
      title: 'Blog, ColdSurf',
    }
  }

  const pageTitle = (() => {
    if (page?.properties.Name.type !== 'title') {
      return ''
    }
    return page.properties.Name.title.at(0)?.plain_text ?? ''
  })()

  if (!pageTitle) {
    return {
      title: 'Blog, ColdSurf',
    }
  }

  const writers = (() => {
    if (page.properties?.Writer.type !== 'people') {
      return []
    }
    return page?.properties?.Writer.people
      .map((value) => {
        const _value = value as UserObjectResponse
        return _value.name
      })
      .filter((value) => value !== null)
  })()

  const publishDate = (() => {
    if (page.properties?.['Publish date']?.type !== 'date') {
      return null
    }
    return page.properties?.['Publish date'].date?.start ? new Date(page.properties?.['Publish date'].date.start) : null
  })()

  const tags = (() => {
    if (page.properties.tags.type !== 'multi_select') {
      return []
    }
    return page.properties.tags.multi_select.map((value) => ({
      id: value.id,
      name: value.name,
      color: value.color,
    }))
  })()

  const authors: Metadata['authors'] = writers.map((name: string) => {
    return {
      name,
    }
  })

  const thumbnailUrl = (() => {
    if (page.properties?.['thumb'].type !== 'url') {
      return ''
    }
    return page.properties?.['thumb'].url ?? ''
  })()

  const metadata: Metadata = metadataInstance.generateMetadata<Metadata>({
    title: `${pageTitle} | Blog, ColdSurf`,
    description: `${pageTitle}`,
    authors,
    openGraph: {
      type: 'article',
      siteName: 'COLDSURF Blog',
      publishedTime: publishDate?.toISOString(),
      authors: writers,
      url: `${SITE_URL}/${options.locale}/${options.seriesCategory}/${options.slug}`,
      title: pageTitle,
      description: `${pageTitle}`,
      images: [
        {
          url: thumbnailUrl ?? '',
        },
      ],
    },
    keywords: tags.map((tag) => tag.name),
    alternates: {
      canonical: `${SITE_URL}/${options.locale}/${options.seriesCategory}/${options.slug}`,
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}/${options.seriesCategory}/${options.slug}`]),
      ),
    },
  })

  return metadata
}

export const generateLogListMetadata = ({
  title,
  description,
  locale,
  seriesCategory,
}: {
  title: string
  description: string
  locale: (typeof routing.locales)[number]
  seriesCategory: SeriesCategory
}) => {
  const metaTitle = title
  const metaDescription = description

  const meta = metadataInstance.generateMetadata<Metadata>({
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      url: `${SITE_URL}/${locale}/${seriesCategory}`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/${seriesCategory}`,
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}/${seriesCategory}`]),
      ),
    },
  })

  return meta
}
