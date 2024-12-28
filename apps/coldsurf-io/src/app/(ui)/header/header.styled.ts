import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

export const StyledHeaderWrapper = styled.div`
  padding-left: 96px;
  padding-right: 96px;
  padding-top: 48px;
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
`

export const StyledHeader = styled.header`
  max-width: 1728px;
  width: 100%;
  background-color: ${semantics.color.background[3]};
  border-radius: 10000px;

  height: 78px;

  display: flex;
  align-items: center;

  padding: 12px;

  ${media.large(css`
    max-width: 1536px;
  `)}

  ${media.medium(css`
    max-width: none;
    width: 100%;
  `)}
`

export const StyledMenuContainer = styled.div``

export const StyledMenuText = styled(Text)`
  color: ${semantics.color.foreground[3]};
`

export const StyledMenuItem = styled(Link)`
  padding: 11px 16px;
  border-radius: 8px;

  &:hover {
    background-color: ${semantics.color.background[4]};
  }
`

export const StyledLogoImage = styled(Image)`
  border-radius: 50%;
  margin-right: 20px;
  width: 48px;
  height: 48px;
`

export const StyledLogoText = styled(Text)`
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin: unset;
  color: ${semantics.color.foreground[3]};
  ${media.large(css`
    display: none;
  `)}
`

export const StyledLogoWrapper = styled(Link)`
  padding-left: 32px;
  margin-right: 48px;
  display: flex;
  align-items: center;

  ${media.large(css`
    padding-left: 18px;
    margin-right: 0;
  `)}
`
