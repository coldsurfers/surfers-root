import { SubscribedConcertListScreen } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SubscribedStackParam } from './subscribed-stack-navigation.types'

const SubscribedStack = createNativeStackNavigator<SubscribedStackParam>()

export const SubscribedStackNavigation = () => {
  return (
    <SubscribedStack.Navigator>
      <SubscribedStack.Screen
        options={{
          header: () => null,
        }}
        name="SubscribedConcertListScreen"
        component={SubscribedConcertListScreen}
      />
    </SubscribedStack.Navigator>
  )
}
