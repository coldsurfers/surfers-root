import { SubscribedConcertListScreen } from '@/screens'
import { NavigationHeader } from '@/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SubscribedStackParamList } from './subscribed-stack-navigation.types'

const SubscribedStack = createNativeStackNavigator<SubscribedStackParamList>()

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
                title: '공연',
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
