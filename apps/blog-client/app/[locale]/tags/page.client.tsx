'use client'

import { StyledTagPageTitle } from './page.styled'

export const TagsPageClient = ({
  tags,
}: {
  tags: {
    id: string
    name: string
    color: string
  }[]
}) => {
  return <StyledTagPageTitle as="h1">Tags</StyledTagPageTitle>
}
