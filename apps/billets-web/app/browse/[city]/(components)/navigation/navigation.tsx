'use client'

import { MapPinIcon, NavBtnText, NavButton, NavContainer } from './navigation.styled'

export const Navigation = ({ initialCity }: { initialCity: string }) => {
  return (
    <NavContainer>
      <NavButton>
        <MapPinIcon />
        <NavBtnText>{initialCity.toUpperCase()}</NavBtnText>
      </NavButton>
    </NavContainer>
  )
}
