import { GLOBAL_Z_INDEX } from '@/libs/constants'
import { Button, semantics, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { MapPin } from 'lucide-react'

export const NavContainer = styled.nav`
  display: flex;
  z-index: ${GLOBAL_Z_INDEX.APP_HEADER + 2};
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
