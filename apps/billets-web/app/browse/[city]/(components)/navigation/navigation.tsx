'use client'

import { apiClient } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useRef, useState } from 'react'
import { NavigationCityDropdown } from './navigation-city-dropdown'
import { MapPinIcon, NavBtnText, NavButton, NavContainer } from './navigation.styled'

export const Navigation = ({ initialCity }: { initialCity: string }) => {
  const cityDropdownBtnRef = useRef<HTMLButtonElement | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number
    left: number
  }>({
    top: 0,
    left: 0,
  })
  const { data } = useQuery({
    queryKey: apiClient.location.queryKeys.getCountries(),
    queryFn: apiClient.location.getCountries,
  })
  console.log(data)

  // Handle dropdown open
  const openDropdown = useCallback(() => {
    if (cityDropdownBtnRef.current) {
      const rect = cityDropdownBtnRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY, // Bottom of button
        left: rect.left + window.scrollX, // Left of button
      })
    }
    setIsDropdownOpen(true)
  }, [])

  return (
    <>
      <NavContainer>
        <NavButton ref={cityDropdownBtnRef} onClick={openDropdown}>
          <MapPinIcon />
          <NavBtnText>{initialCity.toUpperCase()}</NavBtnText>
        </NavButton>
      </NavContainer>
      <NavigationCityDropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        position={dropdownPosition}
      />
    </>
  )
}
