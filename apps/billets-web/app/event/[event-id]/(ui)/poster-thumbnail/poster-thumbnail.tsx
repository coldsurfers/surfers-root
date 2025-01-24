'use client'

import { useMemo } from 'react'
import {
  StyledContentWrapper,
  StyledInfoIcon,
  StyledPosterThumbnail,
  StyledPosterThumbnailEmpty,
  StyledPosterThumbnailEmptyText,
} from './poster-thumbnail.styled'

export function PosterThumbnail({ src, alt }: { src: string; alt?: string }) {
  const source = useMemo(() => {
    if (!src) return ''
    return `${src}&width=350&height=350`
  }, [src])
  return source ? (
    <StyledContentWrapper>
      <StyledPosterThumbnail src={source} alt={alt} />
      <StyledInfoIcon />
    </StyledContentWrapper>
  ) : (
    <StyledPosterThumbnailEmpty>
      <StyledPosterThumbnailEmptyText>{alt}</StyledPosterThumbnailEmptyText>
    </StyledPosterThumbnailEmpty>
  )
}
