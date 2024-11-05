import Head from 'next/head'

import { Text, renderBlock } from '@/features/notion'
import { notFound } from 'next/navigation'
import { getBlocks } from '../../../../lib/notion'
// prismjs
import { getTechlogDetail, queryLogs } from '@/lib/utils'
import { CommonBack } from '@/ui'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-tomorrow.css'
import { Fragment } from 'react'

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

  if (!page) {
    return {
      title: 'Blog, ColdSurf',
    }
  }

  // @ts-ignore
  const pageTitle = page.properties.Name.title.at(0)?.plain_text
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

  if (!blocks) {
    return <div />
  }

  return (
    <div>
      <Head>
        {/* @ts-ignore */}
        <title>{page.properties.Name.title.at(0)?.plain_text}</title>
      </Head>

      <article>
        <h1>
          {/* @ts-ignore */}
          <Text title={page.properties?.Name.title} />
        </h1>
        <section>
          {blocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <CommonBack />
        </section>
      </article>
    </div>
  )
}
