'use client';

import type { SeriesItem } from 'app/blog/(types)/series';
import { generateSeriesHref, generateSeriesItemHref } from 'app/blog/(utils)';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Text } from '../../(notion-render)/renderer.text';
import {
  StyledPostDateText,
  StyledPostItemContainer,
  StyledPostPlatformText,
  StyledPostThumbnail,
  StyledPostTitleText,
} from './post-item.styled';

export const PostItem = memo((props: SeriesItem & { isOfficialBlog?: boolean }) => {
  const platformHref = useMemo(
    () =>
      generateSeriesHref({
        seriesCategory: props.seriesCategory,
        isOfficialBlog: props.isOfficialBlog,
      }),
    [props.seriesCategory, props.isOfficialBlog]
  );
  const postHref = useMemo(() => {
    if (props.seriesCategory) {
      return generateSeriesItemHref(props.seriesCategory, props.slug, props.isOfficialBlog);
    }
    if (props.officialBlogSeriesCategory) {
      return generateSeriesItemHref(
        props.officialBlogSeriesCategory,
        props.slug,
        props.isOfficialBlog
      );
    }
    return '#';
  }, [props.seriesCategory, props.officialBlogSeriesCategory, props.slug, props.isOfficialBlog]);

  return (
    <StyledPostItemContainer>
      <Link href={postHref}>
        <StyledPostThumbnail
          src={
            props.thumbnailUrl
              ? props.thumbnailUrl
              : 'https://images.unsplash.com/photo-1734216736145-7cd4b41e6f77?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={props.slug}
        />
      </Link>
      <Link href={platformHref}>
        <StyledPostPlatformText as="p">{props.seriesCategory}</StyledPostPlatformText>
      </Link>
      <Link href={postHref}>
        <StyledPostTitleText as="h2">
          <Text title={props.title} />
        </StyledPostTitleText>
      </Link>
      <StyledPostDateText as="p">{props.dateLocale}</StyledPostDateText>
    </StyledPostItemContainer>
  );
});
