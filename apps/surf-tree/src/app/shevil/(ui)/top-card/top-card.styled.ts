import { colors } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

export const StyledTopCard = styled.div<{ $backgroundImageUrl: string }>`
  border-radius: 8px;
  background: ${colors.oc.violet[2].value};
  width: 580px;
  height: 28rem;
  background-image: url(${(props) => props.$backgroundImageUrl});
  background-position: 50%;
  background-size: cover;
  mask: radial-gradient(100% 100% at center top, #000 60%, transparent 100%);
`
