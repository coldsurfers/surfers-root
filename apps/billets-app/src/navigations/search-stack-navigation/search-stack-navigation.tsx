import { SearchScreen } from '@/screens'
import { ConcertMapScreen } from '@/screens/concert-map-screen'
import { NavigationHeader } from '@/ui'
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
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                title: '검색',
                headerBackVisible: false,
              }}
            />
          ),
        }}
      />
      <SearchStack.Screen
        name="ConcertMapScreen"
        component={ConcertMapScreen}
        options={{
          header: () => null,
        }}
      />
    </SearchStack.Navigator>
  )
}

export default SearchStackNavigation
