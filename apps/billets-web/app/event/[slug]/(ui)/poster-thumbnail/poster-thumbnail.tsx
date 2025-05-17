'use client'

import { isEmptySource } from '@/libs/utils/utils.image'
import { components } from '@coldsurfers/api-sdk'
import { ImageModal } from 'app/(ui)'
import { useCallback, useMemo, useState } from 'react'
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
    if (isEmptySource(src)) return ''
    return `${src}`
  }, [src])
  const imageModalSource = useMemo(() => {
    if (isEmptySource(src)) return ''
    return `${src}`
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
