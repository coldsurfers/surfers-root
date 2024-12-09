import { SearchScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SearchStackParam } from './search-stack-navigation.types'

const SearchStack = createNativeStackNavigator<SearchStackParam>()

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
    </SearchStack.Navigator>
  )
}

export default SearchStackNavigation
