import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { HEADER_HEIGHT } from 'app/(ui)'

export const StyledPageLayout = styled.div`
  position: relative; /* Required for sticky */
  height: 100vh; /* Tall parent container */
  display: flex;
  align-items: flex-start;

  ${media.medium(css`
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
  `)}
`

export const StyledPosterContainer = styled.div`
  position: sticky;
  top: calc(${HEADER_HEIGHT} + 32px);
  left: 2rem;
  width: 320px;
  aspect-ratio: 1 / 1;
  flex: 1;

  ${media.medium(css`
    width: 100%;
    position: static;
  `)}
`

export const StyledRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-left: 48px;

  ${media.large(css`
    margin-left: 62px;
  `)}

  ${media.medium(css`
    margin-left: 0px;
  `)}
`

export const StyledTopInfoContainer = styled.div``

export const StyledTicketCTAContainer = styled.div`
  margin-top: 3rem;
`

export const StyledLineupContainer = styled.div``

export const StyledVenueContainer = styled.div``
