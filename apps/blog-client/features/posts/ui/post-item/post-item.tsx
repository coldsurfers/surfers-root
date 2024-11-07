/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from '@/features'
import { Link } from 'i18n/routing'
import {
  StyledPostItemContainer,
  StyledPostItemDateLocale,
  StyledPostItemPostTitleContainer,
  StyledPostItemTitleText,
  StyledPostItemWriterAvatar,
  StyledPostItemWriterContainer,
  StyledPostItemWriterText,
  StyledPostSubContentContainer,
} from './post-item.styled'

export function PostItem({
  postType,
  post,
}: {
  postType: 'techlog' | 'surflog'
  post: {
    id: string
    createdTime: Date
    lastEditedTime: Date
    dateLocale: string
    slug: any
    title: any
    status: any
    writer: {
      object: 'user'
      id: string
      name: string
      avatar_url: string
      type: 'person'
      person: unknown
    } | null
  }
}) {
  return (
    <Link
      href={{
        pathname: postType === 'surflog' ? '/surflog/[slug]' : '/techlog/[slug]',
        params: {
          slug: post.slug,
        },
      }}
    >
      <StyledPostItemContainer>
        <StyledPostItemPostTitleContainer>
          <StyledPostItemTitleText>
            <Text title={post.title} />
          </StyledPostItemTitleText>
        </StyledPostItemPostTitleContainer>
        <StyledPostSubContentContainer>
          {post.writer && (
            <StyledPostItemWriterContainer>
              <StyledPostItemWriterAvatar src={post.writer?.avatar_url} />
              <StyledPostItemWriterText>{post.writer?.name}</StyledPostItemWriterText>
            </StyledPostItemWriterContainer>
          )}
          <StyledPostItemDateLocale>{post.dateLocale}</StyledPostItemDateLocale>
        </StyledPostSubContentContainer>
      </StyledPostItemContainer>
    </Link>
  )
}
