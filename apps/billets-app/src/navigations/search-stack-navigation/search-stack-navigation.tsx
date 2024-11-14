import { SearchScreen } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SearchStackParam } from './search-stack-navigation.types'

const SearchStack = createNativeStackNavigator<SearchStackParam>()

const SearchStackNavigation = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          header: () => null,
        }}
      />
    </SearchStack.Navigator>
  )
}

export default SearchStackNavigation
