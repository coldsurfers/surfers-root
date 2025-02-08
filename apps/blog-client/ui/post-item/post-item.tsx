'use client'

import { Text } from '@/features'
import { SeriesItem } from '@/lib/types/series'
import { generateSeriesHref, generateSeriesItemHref } from '@/lib/utils'
import { Link } from 'i18n/routing'
import { I18nPathWithParams } from 'i18n/types'
import { useMemo } from 'react'
import {
  StyledPostDateText,
  StyledPostPlatformText,
  StyledPostThumbnail,
  StyledPostTitleText,
} from './post-item.styled'

export function PostItem(props: SeriesItem) {
  const platformHref = useMemo<I18nPathWithParams>(() => generateSeriesHref(props.series), [props.series])
  const postHref = useMemo<I18nPathWithParams>(
    () => generateSeriesItemHref(props.series, props.slug),
    [props.series, props.slug],
  )

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
          alt={props.slug}
        />
      </Link>
      <Link href={platformHref}>
        <StyledPostPlatformText as="p">{props.series}</StyledPostPlatformText>
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
