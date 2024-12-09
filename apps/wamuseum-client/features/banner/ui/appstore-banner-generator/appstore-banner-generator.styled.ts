import { colors, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { APPSTORE_BANNER_SIZE } from './appstore-banner-generator.constants'

export const StyledGeneratorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledBannerWrapper = styled.div<{ $bgColor: string }>`
  width: ${APPSTORE_BANNER_SIZE.width / 2}px;
  height: ${APPSTORE_BANNER_SIZE.height / 2}px;
  background: ${(props) => props.$bgColor};
  aspect-ratio: ${APPSTORE_BANNER_SIZE.width / 2} / ${APPSTORE_BANNER_SIZE.height / 2};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledPromotionText = styled(Text)`
  text-align: center;
  color: ${colors.oc.black.value};
  font-size: 3.5vw;
  margin: 2.5rem 0px 0px 0px;
`

export const StyledBannerImg = styled.img`
  width: 100%;
  height: 100%;
  margin-top: -1rem;
`
