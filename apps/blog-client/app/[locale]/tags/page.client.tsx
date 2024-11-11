'use client'

import { useGetTagsQuery } from '@/lib'
import { TagItem } from '@/ui'
import { Link } from 'i18n/routing'
import { StyledSectionTagList, StyledTagPageTitle } from './page.styled'

export const TagsPageClient = () => {
  const { data } = useGetTagsQuery()
  return (
    <>
      <StyledTagPageTitle as="h1">Tags</StyledTagPageTitle>
      <StyledSectionTagList>
        {data?.tags.map((tag) => {
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
