'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { ImageModal } from 'app/(ui)'
import { useCallback, useMemo, useState } from 'react'
import {
  StyledArtistDetailTopContainer,
  StyledArtistDetailTopLeft,
  StyledArtistDetailTopRight,
  StyledArtistNameText,
  StyledArtistThumbnail,
  StyledArtistThumbnailWrapper,
  StyledArtistTopDescriptionWrapper,
  StyledArtistTopSectionTitleText,
  StyledContentWrapper,
  StyledInfoIcon,
} from './artist-detail-top.styled'

export function ArtistDetailTop({ artistId }: { artistId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: artistDetail } = useQuery({
    queryKey: apiClient.artist.queryKeys.detail(artistId),
    queryFn: () => apiClient.artist.getArtistDetail(artistId),
  })
  const thumbUrl = useMemo(() => {
    if (!artistDetail?.thumbUrl) {
      return ''
    }
    return `${artistDetail.thumbUrl}&width=500&height=500&format=png`
  }, [artistDetail?.thumbUrl])
  const imageModalThumbUrl = useMemo(() => {
    if (!artistDetail?.thumbUrl) {
      return ''
    }
    return `${artistDetail.thumbUrl}&width=1300&height=1300`
  }, [artistDetail?.thumbUrl])
  const thumbCopyright = useMemo(() => {
    return artistDetail?.thumbCopyright ?? undefined
  }, [artistDetail?.thumbCopyright])
  const openModal = useCallback(() => setIsModalOpen(true), [])
  return (
    <>
      <StyledArtistDetailTopContainer>
        <StyledArtistDetailTopLeft>
          <StyledArtistTopDescriptionWrapper>
            <StyledArtistTopSectionTitleText>Artist</StyledArtistTopSectionTitleText>
            <StyledArtistNameText>{artistDetail?.name}</StyledArtistNameText>
          </StyledArtistTopDescriptionWrapper>
        </StyledArtistDetailTopLeft>
        <StyledArtistDetailTopRight>
          <StyledArtistThumbnailWrapper>
            {thumbUrl && (
              <StyledContentWrapper>
                <StyledArtistThumbnail src={thumbUrl} onClick={openModal} />
                <StyledInfoIcon onClick={openModal} />
              </StyledContentWrapper>
            )}
          </StyledArtistThumbnailWrapper>
        </StyledArtistDetailTopRight>
      </StyledArtistDetailTopContainer>
      <ImageModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={imageModalThumbUrl}
        copyright={thumbCopyright}
      />
    </>
  )
}
