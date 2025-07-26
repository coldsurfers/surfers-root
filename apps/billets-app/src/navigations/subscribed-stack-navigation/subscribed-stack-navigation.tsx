import { SubscribedConcertListScreen } from '@/screens';
import { SubscribedArtistListScreen } from '@/screens/subscribed-artist-list-screen';
import { SubscribedVenueListScreen } from '@/screens/subscribed-venue-list-screen';
import { NavigationHeader } from '@/ui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SubscribedStackParamList } from './subscribed-stack-navigation.types';

const SubscribedStack = createNativeStackNavigator<SubscribedStackParamList>();

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
      <SubscribedStack.Screen
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                title: '아티스트',
              }}
            />
          ),
        }}
        name="SubscribedArtistListScreen"
        component={SubscribedArtistListScreen}
      />
      <SubscribedStack.Screen
        options={{
          header: (props) => (
            <NavigationHeader
              {...props}
              options={{
                ...props.options,
                title: '공연장',
              }}
            />
          ),
        }}
        name="SubscribedVenueListScreen"
        component={SubscribedVenueListScreen}
      />
    </SubscribedStack.Navigator>
  );
};
