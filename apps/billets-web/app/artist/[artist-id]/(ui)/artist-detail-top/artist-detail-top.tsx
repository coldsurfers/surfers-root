'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import {
  StyledArtistDetailTopContainer,
  StyledArtistDetailTopLeft,
  StyledArtistDetailTopRight,
  StyledArtistNameText,
  StyledArtistThumbnail,
  StyledArtistThumbnailWrapper,
  StyledArtistTopDescriptionWrapper,
  StyledArtistTopSectionTitleText,
} from './artist-detail-top.styled'

export function ArtistDetailTop({ artistId }: { artistId: string }) {
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
  return (
    <StyledArtistDetailTopContainer>
      <StyledArtistDetailTopLeft>
        <StyledArtistTopDescriptionWrapper>
          <StyledArtistTopSectionTitleText>Artist</StyledArtistTopSectionTitleText>
          <StyledArtistNameText>{artistDetail?.name}</StyledArtistNameText>
        </StyledArtistTopDescriptionWrapper>
      </StyledArtistDetailTopLeft>
      <StyledArtistDetailTopRight>
        <StyledArtistThumbnailWrapper>
          {thumbUrl && <StyledArtistThumbnail src={thumbUrl} />}
        </StyledArtistThumbnailWrapper>
      </StyledArtistDetailTopRight>
    </StyledArtistDetailTopContainer>
  )
}
