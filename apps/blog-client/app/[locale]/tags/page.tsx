import { getTags } from '@/lib'
import { TagItem } from '@/ui'
import { Link, routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { StyledSectionTagList, StyledTagPageTitle } from './page.styled'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function TagsPage({ params }: PageProps) {
  const { locale } = params
  setRequestLocale(locale)

  const tags = await getTags()

  return (
    <>
      <StyledTagPageTitle as="h1">Tags</StyledTagPageTitle>
      <StyledSectionTagList>
        {tags.map((tag) => {
          return (
            <Link
              key={tag.id}
              href={{
                pathname: '/tags/[tag]',
                params: {
                  tag: tag.name,
                },
              }}
            >
              <TagItem {...tag} />
            </Link>
          )
        })}
      </StyledSectionTagList>
    </>
  )
}
