'use client'

import { StyledPosterThumbnail } from './poster-thumbnail.styled'

export function PosterThumbnail({ src, alt }: { src: string; alt?: string }) {
  return <StyledPosterThumbnail src={src} alt={alt} />
}
