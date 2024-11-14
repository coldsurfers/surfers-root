import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../../screens/SearchScreen'
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
