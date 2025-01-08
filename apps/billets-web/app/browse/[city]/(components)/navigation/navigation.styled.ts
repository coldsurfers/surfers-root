import { GLOBAL_Z_INDEX } from '@/libs/constants'
import { Button, colors, media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export const NavContainer = styled.nav`
  display: flex;
  z-index: ${GLOBAL_Z_INDEX.APP_HEADER + 2};

  ${media.large(css`
    margin-left: 2rem;
    margin-right: 2rem;
  `)}

  ${media.small(css`
    margin-left: 1rem;
    margin-right: 1rem;
  `)}
`

export const NavButton = styled(Button)`
  background: initial;
  border: none;
  border-radius: 8px;
  background-color: ${semantics.color.background[4]};
  z-index: ${GLOBAL_Z_INDEX.APP_HEADER + 2};

  padding: 1rem;
`

export const NavBtnText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`

export const MapPinIcon = styled(MapPin)`
  color: ${semantics.color.foreground[3]};
  width: 16px;
  height: 16px;
  margin-right: 0.25rem;
`

export const NavigationDropdownMotionDiv = styled(motion.div)`
  background-color: ${semantics.color.background[4]};

  position: absolute;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: ${GLOBAL_Z_INDEX.APP_HEADER + 2};
`

export const DropdownItemSectionHeader = styled.div`
  padding: 1rem;
`

export const DropdownItemSectionHeaderTitle = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  margin: unset;
  color: ${semantics.color.foreground[4]};
`

export const DropdownItem = styled.div<{ $isLast?: boolean }>`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  cursor: pointer;
  &:hover {
    background-color: ${semantics.color.background[5]};
  }
  ${(props) =>
    props.$isLast &&
    css`
      padding-bottom: 1rem;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    `}
`

export const DropdownItemText = styled(Text)<{ $isSelected?: boolean }>`
  font-size: 16px;
  font-weight: 400;
  margin: unset;
  color: ${(props) => (props.$isSelected ? colors.oc.indigo[4].value : semantics.color.foreground[3])};
`
