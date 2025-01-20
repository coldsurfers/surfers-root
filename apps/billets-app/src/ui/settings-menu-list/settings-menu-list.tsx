import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { LogOut, UserRoundX } from 'lucide-react-native'
import { FlatList, View } from 'react-native'
import { getBuildNumber, getVersion } from 'react-native-device-info'
import { StyledMenuItem, StyledText, StyledVersionText } from './settings-menu-list.styled'

export const SettingsMenuList = () => {
  const { semantics } = useColorScheme()

  const data = [
    {
      title: 'Log out',
      icon: <LogOut color={semantics.foreground[1]} />,
    },
    {
      title: 'Delete account',
      icon: <UserRoundX color={semantics.foreground[1]} />,
    },
  ] as const

  const versionInfoText = `${getVersion()} (${getBuildNumber()})`

  return (
    <FlatList
      data={data}
      renderItem={(info) => {
        return (
          <StyledMenuItem
            style={{
              borderBottomColor: semantics.border[1],
            }}
          >
            {info.item.icon}
            <StyledText style={{ color: semantics.foreground[1] }}>{info.item.title}</StyledText>
          </StyledMenuItem>
        )
      }}
      style={{
        backgroundColor: semantics.background[3],
        flex: 1,
      }}
      ListFooterComponent={
        <View>
          <StyledVersionText style={{ color: semantics.foreground[4] }}>{versionInfoText}</StyledVersionText>
        </View>
      }
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
    />
  )
}
