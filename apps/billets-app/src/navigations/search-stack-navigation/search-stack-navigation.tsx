import { SearchScreen } from '@/screens'
import { ConcertMapScreen } from '@/screens/concert-map-screen'
import { NavigationHeader } from '@/ui'
import { TextInput } from '@coldsurfers/ocean-road/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'
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
              searchBarComponent={
                <View style={styles.topInputWrapper}>
                  <TextInput
                    value={''}
                    onChangeText={() => {}}
                    autoCapitalize="none"
                    placeholder={'🔎 어떤 공연을 찾고 싶으세요?'}
                    clearButtonMode="while-editing"
                  />
                </View>
              }
            />
          ),
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

const styles = StyleSheet.create({
  topInputWrapper: {
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 14,
  },
})

export default SearchStackNavigation
