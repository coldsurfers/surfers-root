import InputWithLabel from '@/ui/InputWithLabel'
import { Button } from '@coldsurfers/ocean-road'
import { Cinzel, Merriweather } from '@next/font/google'
import saveAs from 'file-saver'
import { toJpeg } from 'html-to-image'
import { ChangeEventHandler, useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  StyledAlbumTitleText,
  StyledArtistText,
  StyledBannerImg,
  StyledBannerWrapper,
  StyledGeneratorWrapper,
  StyledLine,
} from './album-cover-banner-generator.styled'
import { AlbumCoverBannerGeneratorForm } from './album-cover-banner-generator.types'

const bgColor = '#ecedda'

const artistFont = Merriweather({ subsets: ['latin'], weight: '400' })
const albumTitleFont = Cinzel({ subsets: ['latin'], weight: '500' })

export const AlbumCoverBannerGenerator = () => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const { watch, setValue } = useForm<AlbumCoverBannerGeneratorForm>()
  const { artist, albumTitle } = watch()
  const onFileInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const selectedFile = e.target.files?.item(0)
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }, [])

  const handleExport = useCallback(async () => {
    if (bannerRef.current) {
      try {
        const dataUrl = await toJpeg(bannerRef.current, {
          quality: 0.95,
          canvasHeight: 3000,
          canvasWidth: 3000,
        })
        saveAs(dataUrl, 'banner.jpeg')
      } catch (error) {
        console.error('Error exporting banner:', error)
      }
    }
  }, [])

  return (
    <StyledGeneratorWrapper>
      <input type="file" onChange={onFileInputChange} />
      <InputWithLabel label="아티스트" value={artist} onChangeText={(text) => setValue('artist', text)} />
      <InputWithLabel label="앨범 타이틀" value={albumTitle} onChangeText={(text) => setValue('albumTitle', text)} />
      <StyledBannerWrapper ref={bannerRef} $bgColor={bgColor}>
        <div className={artistFont.className} style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
          <StyledArtistText>{artist}</StyledArtistText>
        </div>
        <StyledLine />
        <div className={albumTitleFont.className} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <StyledAlbumTitleText>{albumTitle}</StyledAlbumTitleText>
        </div>
        {previewUrl && <StyledBannerImg src={previewUrl} />}
      </StyledBannerWrapper>
      <Button onClick={handleExport}>이미지 다운로드</Button>
    </StyledGeneratorWrapper>
  )
}
