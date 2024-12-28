import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledWrapper = styled.div`
  padding-left: 96px;
  padding-right: 96px;
  padding-top: 180px;
  width: 100%;
  display: flex;
  justify-content: center;

  ${media['xx-large'](css`
    padding-left: 48px;
    padding-right: 48px;
    padding-top: 48px;
  `)}

  ${media['x-large'](css`
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
  `)}

  ${media.large(css`
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
  `)}
`

export const StyledLandingTextContainer = styled.header`
  max-width: 1728px;
  width: 100%;
  z-index: 2;

  display: flex;
  flex-direction: column;

  ${media.large(css`
    max-width: 1536px;
  `)}

  ${media.medium(css`
    max-width: none;
    width: 100%;
  `)}
`

export const StyledLandingText = styled(Text)`
  font-size: clamp(32px, 8.5vmin, 88px);
  font-weight: 820;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-align: left;
`

export const StyledSmallLandingText = styled(Text)`
  font-size: clamp(16px, 2vmin, 20px);
  font-weight: 418;
  letter-spacing: -0.02em;
  line-height: 1.5;
`
