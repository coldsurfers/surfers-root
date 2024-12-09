import { VenueDetailScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { VenueStackParam } from './venue-stack-navigation.types'

const VenueStack = createNativeStackNavigator<VenueStackParam>()

export const VenueStackNavigation = () => {
  return (
    <VenueStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <VenueStack.Screen
        name="VenueDetailScreen"
        component={VenueDetailScreen}
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
    </VenueStack.Navigator>
  )
}
