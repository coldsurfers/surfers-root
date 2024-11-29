import { colors, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

export const StyledGeneratorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledBannerWrapper = styled.div<{ $bgColor: string }>`
  width: 1320px;
  height: 2868px;
  background: ${(props) => props.$bgColor};
  aspect-ratio: 1320 / 2868;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledPromotionText = styled(Text)`
  text-align: center;
  color: ${colors.oc.black.value};
  font-size: 7em;
  margin: 1em 0px 0px 0px;
`

export const StyledBannerImg = styled.img`
  width: 100%;
  height: 100%;
  margin-top: -2em;
`
