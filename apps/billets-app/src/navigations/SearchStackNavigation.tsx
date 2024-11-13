import { Screens } from '../lib/navigations'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import SearchScreen from '../screens/SearchScreen'
import { CompositeScreenProps } from '@react-navigation/native'
import { MainTabProp } from './MainTabNavigation.types'
import { SearchScreenParams } from '../screens/SearchScreen.types'

export type SearchStackParam = {
  [Screens.SearchScreen]: SearchScreenParams
}

export type SearchStackProp<T extends keyof SearchStackParam> = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParam, T>,
  MainTabProp<'SearchStackScreen'>
>

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
