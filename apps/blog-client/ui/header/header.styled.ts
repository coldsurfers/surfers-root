import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'i18n/routing'

export const StyledHeaderLinkBadge = styled(Link)`
  border-radius: 32px;
  border: 1px solid ${semantics.color.border[2]};
  padding: 1rem;
`

export const StyledHeaderHeading = styled(Text)<{ $isActive: boolean }>`
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 0.5px;
  font-weight: bold;

  ${media.medium(css`
    font-size: 20px;
  `)}

  ${media.small(css`
    font-size: 16px;
  `)}
`

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;

  overflow-x: scroll;
  scrollbar-width: none; /* For Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.large(css`
    justify-content: flex-start;
    gap: 10px;
  `)}
`

export const StyledHeaderBigContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 0px 0px 0px;

  ${media.large(css`
    padding: 0px 0px 0px 0px;
  `)}
`

export const StyledTitleAndColorScheme = styled.div`
  display: flex;
`

export const StyledHeaderTitle = styled(Text)`
  margin: unset;
`
