'use client'

import { Text } from '@/features'
import { queryLogs } from '@/lib'
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

export function PostItem(props: Awaited<ReturnType<typeof queryLogs>>[number]) {
  return (
    <Link
      href={{
        pathname: props.platform === 'surflog' ? '/surflog/[slug]' : '/techlog/[slug]',
        params: {
          slug: props.slug,
        },
      }}
    >
      <StyledPostItemContainer>
        <StyledPostItemPostTitleContainer>
          <StyledPostItemTitleText>
            <Text title={props.title} />
          </StyledPostItemTitleText>
        </StyledPostItemPostTitleContainer>
        <StyledPostSubContentContainer>
          {props.writer && (
            <StyledPostItemWriterContainer>
              <StyledPostItemWriterAvatar src={props.writer?.avatar_url} />
              <StyledPostItemWriterText>{props.writer?.name}</StyledPostItemWriterText>
            </StyledPostItemWriterContainer>
          )}
          <StyledPostItemDateLocale>{props.dateLocale}</StyledPostItemDateLocale>
        </StyledPostSubContentContainer>
      </StyledPostItemContainer>
    </Link>
  )
}
