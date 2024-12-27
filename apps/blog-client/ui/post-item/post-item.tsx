'use client'

import { LogItem, LogPlatform, Text } from '@/features'
import { Link } from 'i18n/routing'
import { I18nPathWithParams } from 'i18n/types'
import { useMemo } from 'react'
import { match } from 'ts-pattern'
import {
  StyledPostDateText,
  StyledPostPlatformText,
  StyledPostThumbnail,
  StyledPostTitleText,
} from './post-item.styled'

export function PostItem(props: LogItem) {
  const platformHref = useMemo<I18nPathWithParams>(() => {
    return match<LogPlatform, I18nPathWithParams>(props.platform)
      .with('filmlog', () => ({
        pathname: '/filmlog',
      }))
      .with('soundlog', () => ({
        pathname: '/soundlog',
      }))
      .with('squarelog', () => ({
        pathname: '/squarelog',
      }))
      .with('surflog', () => ({
        pathname: '/surflog',
      }))
      .with('techlog', () => ({
        pathname: '/techlog',
      }))
      .with('textlog', () => ({
        pathname: '/textlog',
      }))
      .exhaustive()
  }, [props.platform])
  const postHref = useMemo<I18nPathWithParams>(() => {
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
    <div key={props.id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Link href={postHref}>
        <StyledPostThumbnail
          src={
            props.thumbnailUrl
              ? props.thumbnailUrl
              : 'https://images.unsplash.com/photo-1734216736145-7cd4b41e6f77?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={500}
          height={500}
          alt={props.title}
        />
      </Link>
      <Link href={platformHref}>
        <StyledPostPlatformText as="p">{props.platform}</StyledPostPlatformText>
      </Link>
      <Link href={postHref}>
        <StyledPostTitleText as="h2">
          <Text title={props.title} />
        </StyledPostTitleText>
      </Link>
      <StyledPostDateText as="p">{props.dateLocale}</StyledPostDateText>
    </div>
  )
}
