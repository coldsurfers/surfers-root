import { NextMetadataGenerator } from '@coldsurfers/shared-utils'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { routing } from 'i18n/routing'
import { Metadata } from 'next/types'
import { SITE_URL } from '../constants'

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
  },
})

export const generateLogDetailMetadata = (
  page: PageObjectResponse | null,
  options: {
    locale: (typeof routing.locales)[number]
    slug: string
    logType: 'surflog' | 'techlog' | 'filmlog' | 'soundlog' | 'squarelog' | 'textlog'
  },
) => {
  const pageTitle = page?.properties.Name.type === 'title' ? page.properties.Name.title.at(0)?.plain_text : ''

  if (!page || !pageTitle) {
    return {
      title: 'Blog, ColdSurf',
    }
  }

  // @ts-ignore
  const writers = page?.properties?.Writer?.people?.map((value) => value.name)

  const publishDate =
    page.properties?.['Publish date']?.type === 'date' && page.properties?.['Publish date']?.date?.start
      ? new Date(page.properties?.['Publish date']?.date?.start)
      : null

  const tags =
    page?.properties.tags.type === 'multi_select'
      ? page?.properties.tags.multi_select.map((value) => ({
          id: value.id,
          name: value.name,
          color: value.color,
        }))
      : []

  const authors: Metadata['authors'] = writers.map((name: string) => {
    return {
      name,
    }
  })

  const thumbnailUrl = page.properties?.['thumb'].type === 'url' ? page.properties?.['thumb'].url : ''

  const metadata: Metadata = metadataInstance.generateMetadata<Metadata>({
    title: `${pageTitle} | Blog, ColdSurf`,
    description: `${pageTitle}`,
    authors,
    openGraph: {
      type: 'article',
      siteName: 'COLDSURF News',
      publishedTime: publishDate?.toISOString(),
      authors: writers,
      url: `${SITE_URL}/${options.locale}/${options.logType}/${options.slug}`,
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
      canonical: `${SITE_URL}/${options.locale}/textlog/${options.slug}`,
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}/${options.logType}/${options.slug}`]),
      ),
    },
  })

  return metadata
}

export const generateLogListMetadata = ({
  title,
  description,
  locale,
  logType,
}: {
  title: string
  description: string
  locale: (typeof routing.locales)[number]
  logType: 'surflog' | 'techlog' | 'filmlog' | 'soundlog' | 'squarelog' | 'textlog'
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
      url: `${SITE_URL}/${locale}/${logType}`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/${logType}`,
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}/${logType}`])),
    },
  })

  return meta
}
