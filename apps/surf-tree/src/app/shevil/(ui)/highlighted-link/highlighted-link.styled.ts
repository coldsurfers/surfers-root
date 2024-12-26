import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledHighlightedLinkLayout = styled.div`
  transform: translateY(-1rem);

  ${media.small(css`
    margin-left: 24px;
    margin-right: 24px;
  `)}
`

export const StyledYoutubeEmbedOverlay = styled.div`
  z-index: 1;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 1rem;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
`
