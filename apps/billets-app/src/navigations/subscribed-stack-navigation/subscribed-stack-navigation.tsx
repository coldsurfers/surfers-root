import { SubscribedConcertListScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SubscribedStackParam } from './subscribed-stack-navigation.types'

const SubscribedStack = createNativeStackNavigator<SubscribedStackParam>()

export const SubscribedStackNavigation = () => {
  return (
    <SubscribedStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <SubscribedStack.Screen
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                title: '찜한공연',
              }}
            />
          ),
        }}
        name="SubscribedConcertListScreen"
        component={SubscribedConcertListScreen}
      />
    </SubscribedStack.Navigator>
  )
}
