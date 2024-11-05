/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from '@/features'
import { Paragraph } from '@/ui'
import {
  StyledPostItemContainer,
  StyledPostItemDateLocale,
  StyledPostItemPostTitleLink,
  StyledPostItemWriterAvatar,
  StyledPostItemWriterContainer,
  StyledPostItemWriterText,
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
    <StyledPostItemContainer key={post.id}>
      <StyledPostItemPostTitleLink
        href={{
          pathname: postType === 'surflog' ? '/surflog/[slug]' : '/techlog/[slug]',
          params: {
            slug: post.slug,
          },
        }}
      >
        <Paragraph
          style={{
            fontSize: 18,
            fontWeight: '500',
          }}
        >
          <Text title={post.title} />
        </Paragraph>
      </StyledPostItemPostTitleLink>
      {post.writer && (
        <StyledPostItemWriterContainer>
          <StyledPostItemWriterAvatar src={post.writer?.avatar_url} />
          <StyledPostItemWriterText>{post.writer?.name}</StyledPostItemWriterText>
        </StyledPostItemWriterContainer>
      )}
      <StyledPostItemDateLocale>{post.dateLocale}</StyledPostItemDateLocale>
    </StyledPostItemContainer>
  )
}
