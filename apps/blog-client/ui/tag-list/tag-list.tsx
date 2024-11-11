import { Link } from 'i18n/routing'
import { TagItem } from '../tag-item'
import { StyledSectionTagList } from './tag-list.styled'

export const TagList = ({
  tags,
}: {
  tags: {
    id: string
    name: string
    color: string
  }[]
}) => {
  return (
    <StyledSectionTagList>
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={{
            pathname: '/tags/[tag]',
            params: {
              tag: tag.name,
            },
          }}
        >
          <TagItem {...tag} />
        </Link>
      ))}
    </StyledSectionTagList>
  )
}
