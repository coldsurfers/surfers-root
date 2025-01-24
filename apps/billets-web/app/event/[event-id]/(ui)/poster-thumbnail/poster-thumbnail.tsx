'use client'

import { ImageModal } from 'app/(ui)'
import { useCallback, useMemo, useState } from 'react'
import { components } from 'types/api'
import {
  StyledContentWrapper,
  StyledInfoIcon,
  StyledPosterThumbnail,
  StyledPosterThumbnailEmpty,
  StyledPosterThumbnailEmptyText,
} from './poster-thumbnail.styled'

export function PosterThumbnail({
  src,
  alt,
  copyright,
}: {
  src: string
  alt?: string
  copyright?: components['schemas']['CopyrightDTOSchema']
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const source = useMemo(() => {
    if (!src) return ''
    return `${src}&width=350&height=350`
  }, [src])
  const imageModalSource = useMemo(() => {
    if (!src) return ''
    return `${src}&width=1300&height=1300`
  }, [src])
  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  return source ? (
    <>
      <StyledContentWrapper>
        <StyledPosterThumbnail src={source} alt={alt} onClick={openModal} />
        <StyledInfoIcon onClick={openModal} />
      </StyledContentWrapper>
      <ImageModal
        visible={isModalOpen}
        src={imageModalSource}
        onClose={() => setIsModalOpen(false)}
        copyright={copyright}
      />
    </>
  ) : (
    <StyledPosterThumbnailEmpty>
      <StyledPosterThumbnailEmptyText>{alt}</StyledPosterThumbnailEmptyText>
    </StyledPosterThumbnailEmpty>
  )
}
