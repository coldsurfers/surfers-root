import { apiClient } from '@/lib/api/openapi-client'
import { AuthContext } from '@/lib/contexts/auth-context'
import { useColorScheme } from '@coldsurfers/ocean-road/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut, UserRoundX } from 'lucide-react-native'
import { useCallback, useContext, useMemo } from 'react'
import { Alert, FlatList, ListRenderItem, View } from 'react-native'
import { getBuildNumber, getVersion } from 'react-native-device-info'
import { StyledMenuItem, StyledText, StyledVersionText } from './settings-menu-list.styled'

export const SettingsMenuList = ({ onLogoutSuccess }: { onLogoutSuccess: () => void }) => {
  const { semantics } = useColorScheme()
  const { logout } = useContext(AuthContext)
  const queryClient = useQueryClient()

  const versionInfoText = `${getVersion()} (${getBuildNumber()})`

  const { mutate: deactivateUser } = useMutation({
    mutationFn: apiClient.user.deactivate,
    onSuccess: () => {
      logout()
      onLogoutSuccess()
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: apiClient.user.queryKeys.me })
      await queryClient.setQueryData(apiClient.user.queryKeys.me, null)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: apiClient.user.queryKeys.me })
    },
  })

  const onLogout = useCallback(
    () =>
      Alert.alert('로그아웃', '로그아웃 하시겠어요?', [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '로그아웃',
          onPress: () => {
            logout()
            onLogoutSuccess()
          },
        },
      ]),
    [logout, onLogoutSuccess],
  )

  const onDeactivateUser = useCallback(() => {
    Alert.alert('회원탈퇴', '회원탈퇴를 하면 더 이상 해당 계정으로 로그인 할 수 없어요', [
      {
        style: 'destructive',
        text: '탈퇴하기',
        onPress: () => deactivateUser(),
      },
      {
        style: 'cancel',
        text: '취소',
      },
    ])
  }, [deactivateUser])

  const data = useMemo(
    () =>
      [
        {
          title: 'Log out',
          icon: <LogOut color={semantics.foreground[1]} />,
          onPress: onLogout,
        },
        {
          title: 'Delete account',
          icon: <UserRoundX color={semantics.foreground[1]} />,
          onPress: onDeactivateUser,
        },
      ] as const,
    [onDeactivateUser, onLogout, semantics.foreground],
  )

  const renderItem = useCallback<ListRenderItem<(typeof data)[number]>>(
    (info) => {
      return (
        <StyledMenuItem
          onPress={info.item.onPress}
          style={{
            borderBottomColor: semantics.border[1],
          }}
        >
          {info.item.icon}
          <StyledText style={{ color: semantics.foreground[1] }}>{info.item.title}</StyledText>
        </StyledMenuItem>
      )
    },
    [semantics.border, semantics.foreground],
  )

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
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
