'use client'

import { useMemo } from 'react'
import { StyledPosterThumbnail } from './poster-thumbnail.styled'

export function PosterThumbnail({ src, alt }: { src: string; alt?: string }) {
  const source = useMemo(() => {
    return `${src}&width=350&height=350`
  }, [src])
  return <StyledPosterThumbnail src={source} alt={alt} />
}
