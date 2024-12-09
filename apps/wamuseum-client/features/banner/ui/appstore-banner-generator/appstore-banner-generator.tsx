import InputWithLabel from '@/ui/InputWithLabel'
import { Button } from '@coldsurfers/ocean-road'
import { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { exportBanner } from '../../utils'
import { DndFileZone } from '../dnd-file-zone'
import { APPSTORE_BANNER_SIZE } from './appstore-banner-generator.constants'
import { StyledGeneratorWrapper, StyledPromotionText } from './appstore-banner-generator.styled'
import { AppstoreBannerGeneratorForm } from './appstore-banner-generator.types'

export const AppstoreBannerGenerator = () => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const { watch, setValue } = useForm<AppstoreBannerGeneratorForm>()
  const { promotionText, backgroundColor } = watch()

  const handleExport = useCallback(async () => {
    if (bannerRef.current) {
      exportBanner(bannerRef.current, {
        size: {
          width: 1320,
          height: 2868,
        },
      })
    }
  }, [])

  return (
    <StyledGeneratorWrapper>
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
      <DndFileZone
        ref={bannerRef}
        bgColor={backgroundColor}
        width={APPSTORE_BANNER_SIZE.width / 2}
        height={APPSTORE_BANNER_SIZE.height / 2}
        aspectRatio={`${APPSTORE_BANNER_SIZE.width} / ${APPSTORE_BANNER_SIZE.height}`}
      >
        <StyledPromotionText as="h1">{promotionText}</StyledPromotionText>
      </DndFileZone>
      <Button onClick={handleExport}>이미지 다운로드</Button>
    </StyledGeneratorWrapper>
  )
}
