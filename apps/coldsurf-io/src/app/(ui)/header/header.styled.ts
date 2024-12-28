import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { X as CloseIcon, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const StyledHeaderWrapper = styled.div`
  padding-left: 96px;
  padding-right: 96px;
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
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
  `)};
`

export const StyledHeader = styled.header`
  max-width: 1728px;
  width: 100%;
  background-color: ${semantics.color.background[3]};
  border-radius: 10000px;
  z-index: 2;

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

export const StyledMenuContainer = styled.div`
  display: block;
  ${media.large(css`
    display: none;
  `)}
`

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

  ${media.small(css`
    padding-left: 0;
  `)}
`

export const StyledMobileMenuIcon = styled(Menu)`
  display: none;
  ${media.large(css`
    display: block;
    color: ${semantics.color.foreground[3]};
  `)}
`

export const StyledCloseIconButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  background: ${(props) => (props.$isOpen ? semantics.color.background[1] : semantics.color.background[3])};
  ${media.large(css`
    display: block;
    margin-left: auto;
    margin-right: 18px;
    cursor: pointer;

    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 42px;
    height: 42px;
    border-radius: 50%;
  `)}

  ${media.small(css`
    margin-right: 0px;
  `)}
`

export const StyledCloseIcon = styled(CloseIcon)`
  display: none;
  ${media.large(css`
    display: block;
    color: ${semantics.color.foreground[3]};
  `)}
`
