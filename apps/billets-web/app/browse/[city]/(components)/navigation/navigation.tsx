'use client';

import { GLOBAL_Z_INDEX } from '@/libs/constants';
import { initialPageQuery } from '@/libs/openapi-client';
import { getEventCategoryUIName } from '@/libs/utils/utils.event-category';
import { GlobalLink } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { NavigationCityDropdown } from './navigation-city-dropdown';
import {
  DanceIcon,
  DropdownItem,
  DropdownItemSectionHeader,
  DropdownItemSectionHeaderTitle,
  DropdownItemText,
  MapPinIcon,
  MicVocalIcon,
  NavBtnText,
  NavButton,
  NavContainer,
  TheatreIcon,
} from './navigation.styled';

const getUiIcon = (name: string) => {
  switch (name) {
    case 'Gigs':
      return <MicVocalIcon />;
    case 'Theatre':
      return <TheatreIcon />;
    case 'Dance':
      return <DanceIcon />;
    default:
      return '';
  }
};

export const Navigation = ({ initialCity }: { initialCity: string }) => {
  const cityDropdownBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const { data } = useQuery(initialPageQuery.getCountries());
  const { data: eventCategories } = useQuery({
    ...initialPageQuery.eventCategories(),
    throwOnError: true,
  });
  const params = useParams();

  const eventCategoriesUIData = useMemo(() => {
    return (
      eventCategories?.map((value) => {
        return {
          ...value,
          uiname: getEventCategoryUIName(value.name),
          uiIcon: getUiIcon(value.name),
        };
      }) ?? []
    );
  }, [eventCategories]);

  const dropdownData = useMemo<
    {
      country: string;
      cities: {
        name: string;
        lat: number;
        lng: number;
      }[];
    }[]
  >(() => {
    return (
      data?.map((value) => {
        return {
          country: value.name,
          cities: value.cities,
        };
      }) ?? []
    );
  }, [data]);

  // Handle dropdown open
  const openDropdown = useCallback(() => {
    if (cityDropdownBtnRef.current) {
      const rect = cityDropdownBtnRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY, // Bottom of button
        left: rect.left + window.scrollX, // Left of button
      });
    }
    setIsDropdownOpen(true);
  }, []);

  const renderItem = useCallback(
    (item: (typeof dropdownData)[number]) => {
      return (
        <>
          <DropdownItemSectionHeader>
            <DropdownItemSectionHeaderTitle as="p">
              {item.country.toUpperCase()}
            </DropdownItemSectionHeaderTitle>
          </DropdownItemSectionHeader>
          <Fragment>
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
              );
            })}
          </Fragment>
        </>
      );
    },
    [initialCity]
  );

  return (
    <>
      <NavContainer>
        <NavButton
          $isActive={false}
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
      <NavContainer>
        {eventCategoriesUIData.map((value) => {
          return (
            <GlobalLink
              key={value.id}
              href={`/browse/${params.city}/${value.name.toLowerCase()}`}
              style={{ marginRight: '0.5rem' }}
            >
              <NavButton
                $isActive={
                  value.name.toLowerCase() === params['event-category']?.toString().toLowerCase()
                }
              >
                {value.uiIcon}
                <NavBtnText style={{ fontSize: 14 }}>{value.uiname}</NavBtnText>
              </NavButton>
            </GlobalLink>
          );
        })}
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
  );
};
