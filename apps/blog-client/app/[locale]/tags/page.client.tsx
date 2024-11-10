'use client'

import { TagItem } from '@/ui'
import { Link } from 'i18n/routing'
import { StyledSectionTagList, StyledTagPageTitle } from './page.styled'

export const TagsPageClient = ({
  tags,
}: {
  tags: {
    id: string
    name: string
    color: string
  }[]
}) => {
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
