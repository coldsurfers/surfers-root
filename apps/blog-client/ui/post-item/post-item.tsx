'use client'

import { LogItem, LogPlatform, Text } from '@/features'
import { Link } from 'i18n/routing'
import { I18nPathWithParams } from 'i18n/types'
import { useMemo } from 'react'
import { match } from 'ts-pattern'
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
  const href = useMemo<I18nPathWithParams>(() => {
    return match<LogPlatform, I18nPathWithParams>(props.platform)
      .with('filmlog', () => ({
        pathname: '/filmlog/[slug]',
        params: {
          slug: props.slug,
        },
      }))
      .with('soundlog', () => ({
        pathname: '/soundlog/[slug]',
        params: {
          slug: props.slug,
        },
      }))
      .with('squarelog', () => ({
        pathname: '/squarelog/[slug]',
        params: {
          slug: props.slug,
        },
      }))
      .with('surflog', () => ({
        pathname: '/surflog/[slug]',
        params: {
          slug: props.slug,
        },
      }))
      .with('techlog', () => ({
        pathname: '/techlog/[slug]',
        params: {
          slug: props.slug,
        },
      }))
      .with('textlog', () => ({
        pathname: '/textlog/[slug]',
        params: {
          slug: props.slug,
        },
      }))
      .exhaustive()
  }, [props.platform, props.slug])

  return (
    <Link href={href}>
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
