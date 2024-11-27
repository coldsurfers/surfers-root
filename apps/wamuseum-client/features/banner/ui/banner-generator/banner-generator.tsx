'use client'

import { saveAs } from 'file-saver'
import { toJpeg } from 'html-to-image'
import { Bona_Nova } from 'next/font/google'
import { useCallback, useRef } from 'react'
import {
  ArtistText,
  CityText,
  FormattedDateText,
  StyledBannerPreviewWrapper,
  StyledGenerateButton,
  TitleText,
  VenueText,
} from './banner-generator.styled'
import { BannerGeneratorProps } from './banner-generator.types'

const bonaNova = Bona_Nova({ subsets: ['latin'], weight: '400' })

export const BannerGenerator = ({ artist, city, venue, formattedDate, title }: BannerGeneratorProps) => {
  const bannerRef = useRef<HTMLDivElement>(null)

  const handleExport = useCallback(async () => {
    if (bannerRef.current) {
      try {
        const dataUrl = await toJpeg(bannerRef.current, { quality: 0.95 })
        saveAs(dataUrl, 'banner.jpeg')
      } catch (error) {
        console.error('Error exporting banner:', error)
      }
    }
  }, [])

  return (
    <>
      {/* Banner Preview */}
      <StyledBannerPreviewWrapper ref={bannerRef} className={bonaNova.className}>
        <ArtistText>{artist}</ArtistText>
        <CityText>{city}</CityText>
        <TitleText>{title}</TitleText>
        <VenueText>{venue}</VenueText>
        <FormattedDateText>{formattedDate}</FormattedDateText>
      </StyledBannerPreviewWrapper>
      <StyledGenerateButton onClick={handleExport}>이미지 다운로드</StyledGenerateButton>
    </>
  )
}
