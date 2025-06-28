import { apiClient } from '@/lib/api/openapi-client';
import { MyScreen } from '@/screens';
import { NavigationHeader } from '@/ui';
import { useColorScheme } from '@coldsurfers/ocean-road/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { Bolt } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import type { MyStackParamList } from './my-stack-navigation.types';

const Stack = createNativeStackNavigator<MyStackParamList>();

export const MyStackNavigation = () => {
  const { semantics } = useColorScheme();
  const { data: user } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen
        name="MyScreen"
        component={MyScreen}
        options={{
          header: (props) => {
            if (!user) {
              return null;
            }
            return (
              <NavigationHeader
                {...props}
                options={{
                  ...props.options,
                  title: '프로필',
                  headerBackVisible: false,
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('SettingsStackNavigation', {
                          screen: 'SettingsScreen',
                          params: {},
                        })
                      }
                    >
                      <Bolt color={semantics.foreground[1]} />
                    </TouchableOpacity>
                  ),
                }}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};
