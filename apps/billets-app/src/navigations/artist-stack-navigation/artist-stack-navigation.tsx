import { ArtistDetailScreen } from '@/screens';
import { NavigationHeader } from '@/ui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ArtistStackParamList } from './artist-stack-navigation.types';

const Stack = createNativeStackNavigator<ArtistStackParamList>();

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
  );
};
