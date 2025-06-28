'use client';

import InputWithLabel from '@/ui/InputWithLabel';
import type { NextFont } from '@next/font/dist/types';
import { saveAs } from 'file-saver';
import { toJpeg } from 'html-to-image';

import { FontSelect } from '@/ui';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ArtistText,
  CityText,
  FormattedDateText,
  StyledBannerForm,
  StyledBannerPreviewWrapper,
  StyledGenerateButton,
  TitleText,
  VenueText,
} from './banner-generator.styled';
import type { BannerOptions } from './banner-generator.types';

export const BannerGenerator = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [artistFont, setArtistFont] = useState<NextFont | null>(null);
  const [cityFont, setCityFont] = useState<NextFont | null>(null);
  const [titleFont, setTitleFont] = useState<NextFont | null>(null);
  const [venueFont, setVenueFont] = useState<NextFont | null>(null);
  const [formattedDateFont, setFormattedDateFont] = useState<NextFont | null>(null);
  const { setValue, watch } = useForm<BannerOptions>();
  const { artist, city, venue, formattedDate, title } = watch();

  const handleExport = useCallback(async () => {
    if (bannerRef.current) {
      try {
        const dataUrl = await toJpeg(bannerRef.current, { quality: 0.95 });
        saveAs(dataUrl, 'banner.jpeg');
      } catch (error) {
        console.error('Error exporting banner:', error);
      }
    }
  }, []);

  return (
    <>
      {/* Banner Form */}
      <StyledBannerForm>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <InputWithLabel
            label="아티스트"
            value={artist}
            onChangeText={(text) => setValue('artist', text)}
          />
          <div style={{ marginBottom: '10px', marginLeft: '10px' }}>
            <FontSelect onChange={({ value }) => setArtistFont(value)} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <InputWithLabel
            label="도시 이름"
            value={city}
            onChangeText={(text) => setValue('city', text)}
          />
          <div style={{ marginBottom: '10px', marginLeft: '10px' }}>
            <FontSelect onChange={({ value }) => setCityFont(value)} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <InputWithLabel
            label="콘서트 이름"
            value={title}
            onChangeText={(text) => setValue('title', text)}
          />
          <div style={{ marginBottom: '10px', marginLeft: '10px' }}>
            <FontSelect onChange={({ value }) => setTitleFont(value)} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <InputWithLabel
            label="공연장"
            value={venue}
            onChangeText={(text) => setValue('venue', text)}
          />
          <div style={{ marginBottom: '10px', marginLeft: '10px' }}>
            <FontSelect onChange={({ value }) => setVenueFont(value)} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <InputWithLabel
            label="공연 날짜"
            value={formattedDate}
            onChangeText={(text) => setValue('formattedDate', text)}
          />
          <div style={{ marginBottom: '10px', marginLeft: '10px' }}>
            <FontSelect onChange={({ value }) => setFormattedDateFont(value)} />
          </div>
        </div>
      </StyledBannerForm>
      {/* Banner Preview */}
      <StyledBannerPreviewWrapper ref={bannerRef}>
        <div className={artistFont?.className}>
          <ArtistText>{artist}</ArtistText>
        </div>
        <div className={cityFont?.className}>
          <CityText>{city}</CityText>
        </div>
        <div className={titleFont?.className}>
          <TitleText>{title}</TitleText>
        </div>
        <div className={venueFont?.className}>
          <VenueText>{venue}</VenueText>
        </div>
        <div className={formattedDateFont?.className}>
          <FormattedDateText>{formattedDate}</FormattedDateText>
        </div>
      </StyledBannerPreviewWrapper>
      <StyledGenerateButton onClick={handleExport}>이미지 다운로드</StyledGenerateButton>
    </>
  );
};
