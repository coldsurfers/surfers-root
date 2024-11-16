'use client'

import { LogItem, Text } from '@/features'
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

export function PostItem(props: LogItem) {
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
          <StyledPostItemTitleText numberOfLines={1}>
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
