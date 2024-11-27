'use client'

import { Bona_Nova } from 'next/font/google'
import { useRef } from 'react'
import {
  ArtistText,
  CityText,
  FormattedDateText,
  StyledBannerPreviewWrapper,
  TitleText,
  VenueText,
} from './banner-generator.styled'
import { BannerGeneratorProps } from './banner-generator.types'

const bonaNova = Bona_Nova({ subsets: ['latin'], weight: '400' })

export const BannerGenerator = ({ artist, city, venue, formattedDate, title }: BannerGeneratorProps) => {
  const bannerRef = useRef<HTMLDivElement>(null)
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
    </>
  )
}
