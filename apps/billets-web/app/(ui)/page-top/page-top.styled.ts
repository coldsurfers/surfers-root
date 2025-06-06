import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Ticket } from 'lucide-react'

export const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TopWrapper = styled.div`
  display: flex;
  align-items: center;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

export const TicketIcon = styled(Ticket)`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
`

export const StyledHomeMainTitle = styled(Text)`
  font-weight: 800;
  white-space: pre-line; /* This allows newline support */

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${media.large(css`
    font-size: 42px;
    white-space: normal;
  `)}

  ${media.medium(css`
    font-size: 32px;
    white-space: normal;
  `)}
`

export const StyledHomeSubTitle = styled(StyledHomeMainTitle)`
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -2px;
`
