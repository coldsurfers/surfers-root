import { VenueDetailScreen } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { VenueStackParam } from './venue-stack-navigation.types'

const VenueStack = createNativeStackNavigator<VenueStackParam>()

export const VenueStackNavigation = () => {
  return (
    <VenueStack.Navigator>
      <VenueStack.Screen name="VenueDetailScreen" component={VenueDetailScreen} />
    </VenueStack.Navigator>
  )
}
