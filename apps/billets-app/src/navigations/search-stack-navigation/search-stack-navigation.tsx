import { SearchScreenNavigationHeader } from '@/features'
import { SearchScreen } from '@/screens'
import { ConcertMapScreen } from '@/screens/concert-map-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SearchStackParamList } from './search-stack-navigation.types'

const SearchStack = createNativeStackNavigator<SearchStackParamList>()

const SearchStackNavigation = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          header: SearchScreenNavigationHeader,
        }}
      />
      <SearchStack.Screen
        name="ConcertMapScreen"
        component={ConcertMapScreen}
        options={{
          header: () => null,
          animation: 'fade_from_bottom',
        }}
      />
    </SearchStack.Navigator>
  )
}

export default SearchStackNavigation
