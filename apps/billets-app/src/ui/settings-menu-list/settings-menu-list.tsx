import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { LogOut, UserRoundX } from 'lucide-react-native'
import { FlatList } from 'react-native'
import { StyledMenuItem, StyledText } from './settings-menu-list.styled'

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
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
    />
  )
}
