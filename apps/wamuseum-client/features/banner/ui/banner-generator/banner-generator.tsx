'use client'

import InputWithLabel from '@/ui/InputWithLabel'
import { saveAs } from 'file-saver'
import { toJpeg } from 'html-to-image'
import { Bona_Nova, Rancho, Rock_Salt } from 'next/font/google'
import { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  ArtistText,
  CityText,
  FormattedDateText,
  StyledBannerForm,
  StyledBannerPreviewWrapper,
  StyledGenerateButton,
  TitleText,
  VenueText,
} from './banner-generator.styled'
import { BannerOptions } from './banner-generator.types'

const bonaNova = Bona_Nova({ subsets: ['latin'], weight: '400' })
const rockSalt = Rock_Salt({ subsets: ['latin'], weight: '400' })
const rancho = Rancho({ subsets: ['latin'], weight: '400' })

export const BannerGenerator = () => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const { setValue, watch } = useForm<BannerOptions>()
  const { artist, city, venue, formattedDate, title } = watch()

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
      {/* Banner Form */}
      <StyledBannerForm>
        <InputWithLabel label="아티스트" value={artist} onChangeText={(text) => setValue('artist', text)} />
        <InputWithLabel label="도시 이름" value={city} onChangeText={(text) => setValue('city', text)} />
        <InputWithLabel label="콘서트 이름" value={title} onChangeText={(text) => setValue('title', text)} />
        <InputWithLabel label="공연장" value={venue} onChangeText={(text) => setValue('venue', text)} />
        <InputWithLabel
          label="공연 날짜"
          value={formattedDate}
          onChangeText={(text) => setValue('formattedDate', text)}
        />
      </StyledBannerForm>
      {/* Banner Preview */}
      <StyledBannerPreviewWrapper ref={bannerRef} className={rancho.className}>
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
