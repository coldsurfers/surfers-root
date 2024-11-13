import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import { Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

export const StyledHeaderHeading = styled.p<{ $isActive: boolean }>`
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 16px;
  opacity: 0.6;
  letter-spacing: 0.5px;
  font-weight: bold;
  border-bottom: ${({ $isActive }) => ($isActive ? `2px ${color.oc.blue[5].value} solid` : '0px')};
`

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 24px;

  overflow-x: scroll;
  scrollbar-width: none; /* For Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`

export const StyledHeaderBigContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 0px 0px 0px;
`

export const StyledHeaderTitle = styled(Text)`
  margin: unset;
`
