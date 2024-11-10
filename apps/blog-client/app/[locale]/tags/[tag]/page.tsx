import { getTags, queryLogs } from '@/lib'
import { PostItem, PostListContainer } from '@/ui'
import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { StyledTagDetailPageTitle } from './page.styled'

export async function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }))
  const allTags = await getTags()
  const params = locales
    .map((locale) => {
      return allTags.map((tag) => {
        return {
          tag: tag.name,
          locale: locale.locale,
        }
      })
    })
    .flat()
  return params
}

export default async function TagDetailPage({
  params,
}: PageProps<{
  tag: string
}>) {
  const { tag, locale } = params
  const decodedTag = decodeURIComponent(tag)
  setRequestLocale(locale)
  const promises = [
    queryLogs('surflog', locale, { tag: decodedTag }),
    queryLogs('techlog', locale, { tag: decodedTag }),
  ]
  const logs = (await Promise.all(promises)).flat()

  return (
    <>
      <StyledTagDetailPageTitle as="h1">#{tag}</StyledTagDetailPageTitle>
      <PostListContainer>
        {logs.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
    </>
  )
}
