import Link from 'next/link';
import { TagItem } from '../tag-item';
import { StyledSectionTagList } from './tag-list.styled';

export const TagList = ({
  tags,
  isOfficialBlog,
}: {
  tags: {
    id: string;
    name: string;
    color: string;
  }[];
  isOfficialBlog?: boolean;
}) => {
  return (
    <StyledSectionTagList>
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`/${isOfficialBlog ? 'official-blog' : 'blog'}/tags/${tag.name}`}
        >
          <TagItem {...tag} />
        </Link>
      ))}
    </StyledSectionTagList>
  );
};
