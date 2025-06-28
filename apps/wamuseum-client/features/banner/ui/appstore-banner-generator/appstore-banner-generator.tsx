import InputWithLabel from '@/ui/InputWithLabel';
import { Button } from '@coldsurfers/ocean-road';
import { type DragEvent, useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { exportBanner } from '../../utils';
import {
  StyledBannerImg,
  StyledDndFileZone,
  StyledGeneratorWrapper,
  StyledPromotionText,
} from './appstore-banner-generator.styled';
import type { AppstoreBannerGeneratorForm } from './appstore-banner-generator.types';

export const AppstoreBannerGenerator = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { watch, setValue } = useForm<AppstoreBannerGeneratorForm>();
  const { promotionText, backgroundColor } = watch();
  const [previewUrl, setPreviewUrl] = useState('');

  const handleExport = useCallback(async () => {
    if (bannerRef.current) {
      exportBanner(bannerRef.current, {
        size: {
          width: 1320,
          height: 2868,
        },
      });
    }
  }, []);

  const onFileDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const [bannerImgFile] = droppedFiles;
    setPreviewUrl(URL.createObjectURL(bannerImgFile));
  }, []);

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
      <StyledDndFileZone ref={bannerRef} $bgColor={backgroundColor} onFileDrop={onFileDrop}>
        <StyledPromotionText as="h1">{promotionText}</StyledPromotionText>
        {previewUrl && <StyledBannerImg src={previewUrl} />}
      </StyledDndFileZone>
      <Button onClick={handleExport}>이미지 다운로드</Button>
    </StyledGeneratorWrapper>
  );
};
