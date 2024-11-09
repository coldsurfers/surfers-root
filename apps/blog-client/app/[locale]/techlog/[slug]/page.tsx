import Head from 'next/head'

import { notFound } from 'next/navigation'
import { getBlocks } from '../../../../lib/notion'

import { getTechlogDetail, queryLogs } from '@/lib/utils'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { TechlogSlugPageClient } from './page.client'

export const revalidate = 3600

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }))
  const promises = locales.map(async (locale) => await queryLogs('techlog', locale.locale))
  const result = (await Promise.all(promises)).flat()
  return result.map((value) => ({ slug: value.slug, locale: value.lang }))
}

export async function generateMetadata({ params }: PageProps<{ slug: string }>) {
  // fetch data
  const page = await getTechlogDetail({ slug: params.slug ?? '', lang: params.locale })
  const pageTitle = page?.properties.Name.type === 'title' ? page.properties.Name.title.at(0)?.plain_text : ''

  if (!page || !pageTitle) {
    return {
      title: 'Blog, ColdSurf',
    }
  }

  return {
    title: `${pageTitle} | Blog, ColdSurf`,
    description: `${pageTitle}`,
  }
}

export default async function Page({ params }: PageProps<{ slug: string }>) {
  setRequestLocale(params.locale)
  const page = await getTechlogDetail({ slug: params?.slug ?? '', lang: params.locale })

  if (!page) {
    notFound()
  }

  const blocks = await getBlocks(page?.id)

  const titlePlainText = page.properties.Name.type === 'title' ? page.properties.Name.title.at(0)?.plain_text : null
  const pageTitle = page.properties.Name.type === 'title' ? page.properties.Name.title : null
  const tags =
    page.properties.tags.type === 'multi_select'
      ? page.properties.tags.multi_select.map((value) => ({
          name: value.name,
          color: value.color,
        }))
      : []
  console.log(tags)

  if (!blocks) {
    return <div />
  }

  return (
    <div>
      <Head>
        <title>{titlePlainText}</title>
      </Head>

      <TechlogSlugPageClient pageTitle={pageTitle} pageBlocks={blocks} tags={tags} />
    </div>
  )
}
