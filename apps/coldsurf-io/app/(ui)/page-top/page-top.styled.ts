import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Ticket } from 'lucide-react'

export const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.small(css`
    align-items: flex-start;
  `)}
`

export const TopWrapper = styled.div`
  display: flex;
  align-items: center;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

export const TicketIcon = styled(Ticket)`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;

  ${media.small(css`
    display: none;
  `)}
`

export const StyledHomeMainTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;

  ${media.small(css`
    flex-direction: column;
    margin-bottom: 1.25rem;
  `)}
`

export const StyledHomeMainTitle = styled(Text)`
  font-weight: 800;
  font-size: 2.5rem;
  white-space: pre-line; /* This allows newline support */

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${media.large(css`
    font-size: 42px;
    white-space: normal;
  `)}

  ${media.medium(css`
    font-size: 32px;
    white-space: normal;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  `)}

  ${media.small(css`
    margin: unset;
  `)}
`

export const StyledHomeSubTitle = styled(StyledHomeMainTitle)`
  font-weight: 500;

  font-size: 1.5rem;

  ${media.large(css`
    font-size: 24px;
    white-space: normal;
  `)}

  ${media.medium(css`
    font-size: 20px;
    white-space: normal;
  `)}

  ${media.small(css`
    margin-bottom: 1.25rem;
  `)}
`
