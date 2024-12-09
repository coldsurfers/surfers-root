import { ArtistDetailScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ArtistStackParam } from './artist-stack-navigation.types'

const Stack = createNativeStackNavigator<ArtistStackParam>()

export const ArtistStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen
        name="ArtistDetailScreen"
        component={ArtistDetailScreen}
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                presentation: 'card',
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
