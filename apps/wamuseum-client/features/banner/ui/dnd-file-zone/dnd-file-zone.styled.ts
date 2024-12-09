import { semantics, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

export const StyledBannerZone = styled.div<{
  $bgColor: string
  $shouldShowBorder?: boolean
  $isDragging?: boolean
  $width: number
  $height: number
  $aspectRatio: string
}>`
  width: ${(props) => `${props.$width}px`};
  height: ${(props) => `${props.hidden}px`};
  aspect-ratio: ${(props) => props.$aspectRatio};
  background: ${(props) => props.$bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${(props) =>
    props.$shouldShowBorder &&
    `${props.$isDragging ? 2 : 1}px solid ${props.$isDragging ? semantics.color.border[2] : semantics.color.border[1]}`};
`

export const StyledBannerImg = styled.img`
  width: 100%;
  height: 100%;
  margin-top: -1rem;
`

export const DropHereText = styled(Text)``
