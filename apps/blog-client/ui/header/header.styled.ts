import styled from 'styled-components/native'
import { Paragraph } from '../paragraph'

export const StyledHeaderHeading = styled(Paragraph)<{ $isActive: boolean }>`
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 16px;
  opacity: 0.6;
  letter-spacing: 0.5px;
  font-weight: bold;
  border-bottom-width: ${({ $isActive }) => ($isActive ? '1px' : '0px')};
  border-bottom-color: ${({ $isActive }) => ($isActive ? 'white' : 'unset')};
`

export const StyledHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 48px 0px 0px 0px;
`
