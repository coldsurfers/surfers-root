import InputWithLabel from '@/ui/InputWithLabel'
import { Button } from '@coldsurfers/ocean-road'
import { saveAs } from 'file-saver'
import { toJpeg } from 'html-to-image'
import { ChangeEventHandler, useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  StyledBannerImg,
  StyledBannerWrapper,
  StyledGeneratorWrapper,
  StyledPromotionText,
} from './appstore-banner-generator.styled'
import { AppstoreBannerGeneratorForm } from './appstore-banner-generator.types'

export const AppstoreBannerGenerator = () => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const { watch, setValue } = useForm<AppstoreBannerGeneratorForm>()
  const { promotionText, backgroundColor } = watch()

  const handleExport = useCallback(async () => {
    if (bannerRef.current) {
      try {
        const dataUrl = await toJpeg(bannerRef.current, { quality: 0.95, width: 1320, height: 2868 })
        saveAs(dataUrl, 'banner.jpeg')
      } catch (error) {
        console.error('Error exporting banner:', error)
      }
    }
  }, [])

  const onFileInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const selectedFile = e.target.files?.item(0)
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }, [])

  return (
    <StyledGeneratorWrapper>
      <input type="file" onChange={onFileInputChange} />
      <InputWithLabel
        label="프로모션 텍스트"
        value={promotionText}
        onChangeText={(text) => setValue('promotionText', text)}
        inputAs="textarea"
      />
      <InputWithLabel
        label="백그라운드 컬러"
        value={backgroundColor}
        onChangeText={(text) => setValue('backgroundColor', text)}
      />
      <StyledBannerWrapper ref={bannerRef} $bgColor={backgroundColor}>
        <StyledPromotionText as="h1">{promotionText}</StyledPromotionText>
        <StyledBannerImg src={previewUrl} />
      </StyledBannerWrapper>
      <Button onClick={handleExport}>이미지 다운로드</Button>
    </StyledGeneratorWrapper>
  )
}
