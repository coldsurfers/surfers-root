import Head from 'next/head'
import Link from 'next/link'

import { Text, renderBlock } from '@/features/notion'
import { notFound } from 'next/navigation'
import { getBlocks } from '../../../lib/notion'
import styles from '../../../styles/post.module.css'
// prismjs
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-tomorrow.css'
import { Fragment } from 'react'
import {
    getBlogTechPageFromSlug,
    getBlogThoughtPageFromSlug,
    queryNotionBlogTechArticles,
    queryNotionBlogThoughtsArticles,
} from '../../../lib/utils'

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const techPosts = await queryNotionBlogTechArticles()
  const thoughtPosts = await queryNotionBlogThoughtsArticles()
  return [...techPosts.map((post) => ({ slug: post.slug })), ...thoughtPosts.map((post) => ({ slug: post.slug }))]
}

export async function generateMetadata({ params }: { params?: { slug: string } }) {
  // fetch data
  const page =
    (await getBlogTechPageFromSlug({ slug: params?.slug ?? '' })) ??
    (await getBlogThoughtPageFromSlug({ slug: params?.slug ?? '' }))

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

export default async function Page({ params }: { params?: { slug: string } }) {
  const page = await getBlogTechPageFromSlug({ slug: params?.slug ?? '' })

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
        <title>{page.properties.Title?.title[0].plain_text}</title>
      </Head>

      <article className={styles.container}>
        <h1 className={styles.name}>
          {/* @ts-ignore */}
          <Text title={page.properties.Title?.title} />
        </h1>
        <section>
          {blocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/" className={styles.back}>
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  )
}

// export const getStaticPaths = async () => {
//   const database = await getDatabase(databaseId);
//   return {
//     paths: database.map((page) => {
//       const slug = page.properties.Slug?.formula?.string;
//       return ({ params: { id: page.id, slug } });
//     }),
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   const { slug } = context.params;
//   const page = await getPage(id);
//   const blocks = await getBlocks(id);

//   return {
//     props: {
//       page,
//       blocks,
//     },
//     revalidate: 1,
//   };
// };
