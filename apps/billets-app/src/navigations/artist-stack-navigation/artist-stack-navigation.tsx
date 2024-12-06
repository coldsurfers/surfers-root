import { ArtistDetailScreen } from '@/screens'
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
      <Stack.Screen name="ArtistDetailScreen" component={ArtistDetailScreen} />
    </Stack.Navigator>
  )
}
