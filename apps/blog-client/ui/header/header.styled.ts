import { Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

export const StyledHeaderHeading = styled.p<{ $isActive: boolean }>`
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 32px;
  line-height: 32px;
  letter-spacing: 0.5px;
  font-weight: bold;
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
