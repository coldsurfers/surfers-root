import { SearchScreen } from '@/screens'
import { ConcertMapScreen } from '@/screens/concert-map-screen'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { useMemo } from 'react'
import { SearchStackParamList } from './search-stack-navigation.types'

const SearchStack = createNativeStackNavigator<SearchStackParamList>()

const SearchStackNavigation = () => {
  const navigationScreenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      header: () => null,
    }),
    [],
  )
  const searchScreenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      header: () => null,
    }),
    [],
  )
  const concertScreenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      header: () => null,
      animation: 'fade_from_bottom',
    }),
    [],
  )

  return (
    <SearchStack.Navigator screenOptions={navigationScreenOptions}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} options={searchScreenOptions} />
      <SearchStack.Screen name="ConcertMapScreen" component={ConcertMapScreen} options={concertScreenOptions} />
    </SearchStack.Navigator>
  )
}

export default SearchStackNavigation
