import { CommonScreenLayout, SettingsMenuList } from '@/ui'
import { useCallback } from 'react'
import { useSettingsScreenNavigation } from './settings-screen.hooks'

export const SettingsScreen = () => {
  const navigation = useSettingsScreenNavigation()
  const onLogoutSuccess = useCallback(() => {
    navigation.navigate('MainTabNavigation', {
      screen: 'HomeStackNavigation',
      params: {
        screen: 'HomeScreen',
        params: {},
      },
    })
  }, [navigation])
  return (
    <CommonScreenLayout>
      <SettingsMenuList onLogoutSuccess={onLogoutSuccess} />
    </CommonScreenLayout>
  )
}
