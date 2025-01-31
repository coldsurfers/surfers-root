'use client'

import { GLOBAL_Z_INDEX } from '@/libs/constants'
import { initialPageQuery } from '@/libs/openapi-client'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef, useState } from 'react'
import { GlobalLink } from '../../../../(ui)/global-link/global-link'
import { NavigationCityDropdown } from './navigation-city-dropdown'
import {
  DropdownItem,
  DropdownItemSectionHeader,
  DropdownItemSectionHeaderTitle,
  DropdownItemText,
  MapPinIcon,
  NavBtnText,
  NavButton,
  NavContainer,
} from './navigation.styled'

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
  const { data } = useQuery(initialPageQuery.getCountries())

  const dropdownData = useMemo<
    {
      country: string
      cities: {
        name: string
        lat: number
        lng: number
      }[]
    }[]
  >(() => {
    return (
      data?.map((value) => {
        return {
          country: value.name,
          cities: value.cities,
        }
      }) ?? []
    )
  }, [data])

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

  const renderItem = useCallback(
    (item: (typeof dropdownData)[number]) => {
      return (
        <>
          <DropdownItemSectionHeader>
            <DropdownItemSectionHeaderTitle as="p">{item.country.toUpperCase()}</DropdownItemSectionHeaderTitle>
          </DropdownItemSectionHeader>
          <>
            {item.cities.map((city, index) => {
              return (
                <GlobalLink href={`/browse/${city.name}`} key={city.name}>
                  <DropdownItem $isLast={index === item.cities.length - 1}>
                    <DropdownItemText as="p" $isSelected={city.name === initialCity}>
                      {city.name[0].toUpperCase()}
                      {city.name.slice(1, city.name.length)}
                    </DropdownItemText>
                  </DropdownItem>
                </GlobalLink>
              )
            })}
          </>
        </>
      )
    },
    [initialCity],
  )

  return (
    <>
      <NavContainer>
        <NavButton
          ref={cityDropdownBtnRef}
          onClick={openDropdown}
          style={{
            zIndex: isDropdownOpen ? GLOBAL_Z_INDEX.APP_HEADER + 2 : 'unset',
          }}
        >
          <MapPinIcon />
          <NavBtnText>{initialCity.toUpperCase()}</NavBtnText>
        </NavButton>
      </NavContainer>
      <NavigationCityDropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        position={dropdownPosition}
        data={dropdownData}
        keyExtractor={(value) => `${value.country}`}
        style={{
          width: '250px',
          borderRadius: '8px',
        }}
        renderItem={renderItem}
      />
    </>
  )
}
