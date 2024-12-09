import { colors, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

export const StyledGeneratorWrapper = styled.div`
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
