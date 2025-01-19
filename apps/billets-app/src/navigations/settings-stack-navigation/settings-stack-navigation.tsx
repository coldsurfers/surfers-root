import { SettingsScreen } from '@/screens/settings-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SettingsStackParamList } from './settings-stack-navigation.types'

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>()

export const SettingsStackNavigation = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}
