import { SettingsScreen } from '@/screens/settings-screen';
import { NavigationHeader } from '@/ui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from './settings-stack-navigation.types';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigation = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ header: () => null }}>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          header: (props) => <NavigationHeader {...props} />,
          title: '설정',
        }}
      />
    </SettingsStack.Navigator>
  );
};
